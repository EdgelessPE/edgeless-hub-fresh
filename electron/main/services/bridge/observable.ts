import type { WebContents } from "electron";
import { ipcMain } from "electron";
import { log } from "../../log";
import { Ok, Result } from "ts-results";
import { ObservableBridgeUpdate } from "../../../../types/bridge";
import { getObservableRegistry } from "./register";
import { InitError } from "../../../../types";
import { Observable } from "rxjs";

// 创建用于保存最后一次发送响应对象的 map
// 此 bridge 的行为接近 BehaviorObservable
const recentMap = new Map<string, ObservableBridgeUpdate | null>();
let webContentsGlobal: WebContents | null = null;

function update(
  key: string,
  type: ObservableBridgeUpdate["type"],
  value: unknown
) {
  const res: ObservableBridgeUpdate = {
    key,
    type,
    value,
  };
  recentMap.set(key, res);
  webContentsGlobal?.send("_bridge_observable-update", res);
}

async function initObservableBridge(
  webContents: WebContents
): Promise<Result<null, InitError>> {
  // 存放全局 web contents
  webContentsGlobal = webContents;

  // 初始化需要异步获取的 register keys
  const initRes = await getObservableRegistry();
  if (initRes.err) return initRes;
  const register = initRes.unwrap();

  // 代理订阅全部初始 Observable 并将其更新发送到 ipc 上
  for (const key in register) {
    addObservableToBridge(key, register[key]);
  }

  // 监听来自渲染进程的监听请求并发送 recent 值
  ipcMain.on("_bridge_observable-subscribe", (event, key: string) => {
    if (!recentMap.has(key)) {
      log(`Error:Fatal:Try to subscribe to a unknown observable : ${key}`);
      return;
    } else {
      const recent = recentMap.get(key);
      if (recent != null) {
        event.reply("_bridge_observable-update", recent);
      }
    }
  });

  return new Ok(null);
}

function addObservableToBridge(key: string, observable: Observable<unknown>) {
  recentMap.set(key, null);
  observable.subscribe({
    next: (value) => {
      update(key, "next", value);
    },
    error: (err) => {
      update(key, "error", err);
    },
    complete: () => {
      update(key, "complete", null);
    },
  });
}

export { initObservableBridge, addObservableToBridge };
