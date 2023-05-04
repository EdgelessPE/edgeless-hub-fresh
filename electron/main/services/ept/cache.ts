import { fetchAlpha, fetchHello } from "./parsers";
import { Err, Ok, Result } from "ts-results";
import { AlphaResponse, HelloResponse } from "../../../../types/online";
import { getTempConfig } from "../config";

const cachePool: Map<
  string,
  {
    timestamp: number;
    data: unknown;
  }
> = new Map();

function isOutdated(cur: number, prev: number) {
  return cur - prev > 5 * 60 * 1000;
}

/**
 * 通用获取与缓存管理封装
 * @param key 所需数据的key
 * @param fetchFn 用于获取最新数据的无入参闭包
 */
async function get<T>(
  key: string,
  fetchFn: () => Promise<Result<T, string>>
): Promise<Result<T, string>> {
  // 检查缓存是否有效
  const entry = cachePool.get(key);
  if (entry != null && !isOutdated(Date.now(), entry.timestamp)) {
    return new Ok(entry.data as T);
  } else {
    // 重新获取并刷新缓存
    const fRes = await fetchFn();
    if (fRes.err) return fRes;
    cachePool.set(key, {
      timestamp: Date.now(),
      data: fRes.unwrap(),
    });
    return fRes;
  }
}

async function getHello(): Promise<Result<HelloResponse, string>> {
  // 获取当前 mirror base
  const cfg = getTempConfig();
  const curMirrorName = cfg.ept.mirror.current;
  if (curMirrorName == null) {
    return new Err(`Error:Current ept mirror not set properly`);
  }
  const baseUrl = cfg.ept.mirror.pool[curMirrorName]?.baseUrl;
  if (baseUrl == null) {
    return new Err(
      `Error:Can't find mirror named '${curMirrorName}' in config pool`
    );
  }

  // 构造通用获取闭包
  const fetchFn = async () => {
    return fetchHello(baseUrl);
  };

  return get("hello", fetchFn);
}

async function getAlpha(token: string): Promise<Result<AlphaResponse, string>> {
  // 获取当前 mirror base
  const cfg = getTempConfig();
  const baseUrl = cfg.ept.mirror.current;
  if (baseUrl == null) {
    return new Err(`Error:Current ept mirror not set`);
  }

  // 从 hello 接口获取镜像站 protocol
  const hRes = await getHello();
  if (hRes.err) return hRes;
  const { protocol } = hRes.unwrap();

  // 构造通用获取闭包
  const fetchFn = async () => {
    return fetchAlpha(protocol, baseUrl, token);
  };

  return get("alpha", fetchFn);
}

export { getHello, getAlpha };
