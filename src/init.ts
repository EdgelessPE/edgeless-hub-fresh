import { initObservableBridge } from "@/bridge/observable";
import { initConfig } from "@/services/config";
import { ipcRenderer } from "electron";
import { Message } from "@arco-design/web-react";

export default async function () {
  // 向主进程通知进行初始化并监听是否初始化失败
  ipcRenderer.on("_init-error", (event, msg) => {
    // TODO:区分初始化错误类型并针对性处理
    Message.error(msg);
  });
  ipcRenderer.send("_init");

  initObservableBridge();
  await initConfig();
}
