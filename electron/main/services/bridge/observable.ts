import { Observable } from "rxjs";
import { ipcMain } from "electron";
import { log } from "../../log";
import { getObservableConfig } from "../config";
import { Ok, Result } from "ts-results";

const register: Record<string, Observable<any>> = {};

async function init(): Promise<Result<null, string>> {
  const configRes = await getObservableConfig();
  if (configRes.err) return configRes;
  register.config = configRes.unwrap();

  return new Ok(null);
}

export default async function (): Promise<Result<null, string>> {
  //初始化需要异步获取的 register keys
  const initRes = await init();
  if (initRes.err) return initRes;

  // 创建用于保存最后一次值的 map
  const recentMap = new Map<string, any>();

  //代理订阅全部 Observable 并将其发送到 ipc 上
  for (const key in register) {
    const observable = register[key];
    recentMap.set(key, null);
    observable.subscribe((value) => {
      recentMap.set(key, value);
      ipcMain.emit("_bridge_observable-update", {
        key,
        value,
      });
    });
  }

  //监听来自渲染进程的监听请求并发送 recent 值
  ipcMain.on("_bridge_observable-subscribe", (event, key) => {
    if (!recentMap.has(key)) {
      log(`Error:Fatal:Try to subscribe to a unknown observable : ${key}`);
      return;
    }
    event.reply("_bridge_observable-update", {
      key,
      value: recentMap.get(key),
    });
  });

  return new Ok(null);
}
