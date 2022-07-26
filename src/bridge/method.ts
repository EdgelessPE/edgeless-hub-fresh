import { ipcRenderer } from "electron";
import { BridgeReply, BridgeRequest } from "../../types/bridge";
import { createBridgeObservable } from "@/bridge/observable";

let taskCount = 0;

async function bridge<T>(functionName: string, ...args: unknown[]): Promise<T> {
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
