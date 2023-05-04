import { Err, Ok, Result } from "ts-results";
import { getTempConfig, modifyObservableConfig } from "../config";
import { fetchHello } from "./parsers";
import { log } from "../../log";
import { MirrorLocal } from "../../../../types/ept";

async function infoMirrorOnline(
  baseUrl: string
): Promise<Result<MirrorLocal, string>> {
  const fRes = await fetchHello(baseUrl);
  if (fRes.err) {
    return new Err(`Error:Can't validate mirror ${baseUrl} : ${fRes.val}`);
  } else {
    const hello = fRes.unwrap();
    const local: MirrorLocal = {
      name: hello.name,
      baseUrl,
      description: hello.description,
      property: hello.property,
      protocol: hello.protocol,
      services: hello.services,
    };
    return new Ok(local);
  }
}

async function setMirror(
  name: string,
  baseUrl: string,
  shouldExist = true
): Promise<Result<null, string>> {
  // 检查是否存在
  const { pool } = getTempConfig().ept.mirror;
  const exist = pool[name] != null;
  if (exist != shouldExist) {
    if (shouldExist) {
      return new Err(
        `Error:Fatal:Can't set mirror ${name} : expect mirror to be existed but not`
      );
    } else {
      return new Err(
        `Error:Fatal:Can't set mirror ${name} : expect mirror to be not existed but got ${pool[name]}`
      );
    }
  }
  // 检查 baseUrl 是否有效
  const iRes = await infoMirrorOnline(baseUrl);
  if (iRes.err) {
    return iRes;
  }
  const mirrorLocal = iRes.unwrap();

  const mRes = await modifyObservableConfig((rawConfig) => {
    rawConfig.ept.mirror.pool[name] = mirrorLocal;
    return rawConfig;
  });
  if (mRes.ok) {
    log(`Info:Set mirror ${name} with baseUrl = ${baseUrl}`);
  } else {
    log(
      `Error:Can't set mirror ${name} due to modify config failed : ${mRes.val}`
    );
  }
  return mRes;
}

async function addMirror(
  name: string,
  baseUrl: string
): Promise<Result<null, string>> {
  return setMirror(name, baseUrl, false);
}

async function removeMirror(name: string): Promise<Result<null, string>> {
  const { pool } = getTempConfig().ept.mirror;
  // 检查是否存在
  if (pool[name] == null) {
    return new Err(`Error:Fatal:Can't remove mirror ${name} : `);
  }

  delete pool[name];

  const mRes = await modifyObservableConfig((rawConfig) => {
    rawConfig.ept.mirror.pool = pool;
    return rawConfig;
  });

  if (mRes.ok) {
    log(`Info:Removed mirror ${name}`);
  } else {
    log(
      `Error:Can't remove mirror ${name} due to modify config failed : ${mRes.val}`
    );
  }
  return mRes;
}

async function infoMirror(
  name: string,
  fresh = false
): Promise<Result<MirrorLocal, string>> {
  const { pool } = getTempConfig().ept.mirror;
  const node = pool[name];
  if (node == null) {
    return new Err(`Error:Fatal:Can't find mirror ${name} from local config`);
  }
  if (fresh) {
    // 获取最新的镜像信息
    const iRes = await infoMirrorOnline(node.baseUrl);
    if (iRes.err) {
      return iRes;
    }
    const info = iRes.unwrap();

    // 异步更新最新的镜像信息
    modifyObservableConfig((rawConfig) => {
      rawConfig.ept.mirror.pool[name] = info;
      return rawConfig;
    }).then((mRes) => {
      if (mRes.err) {
        log(
          `Warning:Failed to save fresh mirror info for ${name} : ${mRes.val}`
        );
      }
    });

    return new Ok(info);
  } else {
    return new Ok(node);
  }
}

function listMirror(): MirrorLocal[] {
  const { pool } = getTempConfig().ept.mirror,
    result: MirrorLocal[] = [];
  for (const key in pool) {
    const node = pool[key];
    result.push(node);
  }

  return result;
}

export { addMirror, setMirror, removeMirror, infoMirror, listMirror };
