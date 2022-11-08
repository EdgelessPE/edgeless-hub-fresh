import { ipcMain } from "electron";
import { BridgeReply, BridgeRequest } from "../../../../types/bridge";
import { getMethodRegister } from "./register";
import { isObservable } from "rxjs";
import { addObservableToBridge } from "./observable";

let observableTempMapKeyCount = 0;

export default function () {
  // 创建调用地图
  const callMap = new Map<string, (...args: unknown[]) => unknown>();

  const methodRegistry = getMethodRegister();
  for (const key in methodRegistry) {
    callMap.set(key, methodRegistry[key]);
  }

  // 监听桥事件
  ipcMain.on("_bridge", async (event, req: BridgeRequest) => {
    const entry = callMap.get(req.functionName);
    if (entry == null) {
      const reply = `Error:Fatal:Function "${req.functionName}" unregistered!`;
      // console.log(reply);
      event.reply("_bridge-reply", {
        id: req.id,
        payload: reply,
      });
    } else {
      const payload = await entry(...req.args),
        reply: BridgeReply = {
          id: req.id,
          payload,
        };

      // 对返回 Observable 的特殊处理
      if (isObservable(payload)) {
        const key = `_ORV_${observableTempMapKeyCount++}`;
        addObservableToBridge(key, payload);
        reply.payload = key;
      }

      event.reply("_bridge-reply", reply);
    }
  });
}
