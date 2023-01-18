import { ipcRenderer } from "electron";
import { BridgeReply, BridgeRequest } from "../../types/bridge";
import { createBridgeObservable } from "@/bridge/observable";
import { canBeUnwrapped } from "@/utils/results";
import { log } from "@/utils/log";
import { Message } from "@arco-design/web-react";

let taskCount = 0,
  initFinished = false;
const waitCallbacks: (() => void)[] = [];

ipcRenderer.on("_init-success", () => {
  initFinished = true;
  waitCallbacks.forEach((callback) => {
    callback();
  });
});

// 初始化未完成时 bridge 不可用，因此需要等待主线程通知初始化完成
async function waitInit(): Promise<void> {
  if (initFinished) return;
  else
    return new Promise((resolve) => {
      waitCallbacks.push(resolve);
    });
}

async function bridge<T>(functionName: string, ...args: unknown[]): Promise<T> {
  if (!initFinished) {
    await waitInit();
  }
  return new Promise((resolve) => {
    // 获取任务id
    const id = taskCount++;
    // 生成回调函数
    const callback = (_: unknown, reply: BridgeReply) => {
      if (reply.id != id) return;
      else {
        // 对返回 Observable 的特殊处理
        if (
          typeof reply.payload == "string" &&
          reply.payload.startsWith("_ORV_")
        ) {
          resolve(createBridgeObservable(reply.payload) as unknown as T);
        } else if (canBeUnwrapped(reply.payload)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const r = reply.payload as any;
          r["unwrap"] = function () {
            if (this.ok) {
              return this.val;
            } else {
              log(this.val);
              Message.error(this.val);
              throw `Bridge_CanBeUnwrapped_Throw`;
            }
          };
          resolve(r as T);
        } else {
          resolve(reply.payload as T);
        }
        ipcRenderer.removeListener("_bridge-reply", callback);
        return;
      }
    };
    // 监听回调
    ipcRenderer.on("_bridge-reply", callback);
    // 发送
    const req: BridgeRequest = {
      id,
      args,
      functionName,
    };
    ipcRenderer.send("_bridge", req);
  });
}

export default bridge;
