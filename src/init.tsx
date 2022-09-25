import { initObservableBridge } from "@/bridge/observable";
import { initConfig } from "@/services/config";
import { ipcRenderer } from "electron";
import { Message } from "@arco-design/web-react";
import { InitError } from "../types";
import { log } from "@/utils/log";
import { configError } from "@/modals/configError";

export default async function (modal: any) {
  // 向主进程通知进行初始化并监听是否初始化失败
  ipcRenderer.on("_init-error", (event, err: InitError) => {
    // TODO:区分初始化错误类型并针对性处理
    log(`Error:Init error, type : ${err.type}, msg : ${err.msg}`);
    switch (err.type) {
      case "Config":
        modal.error(configError(err.msg));
        break;
      default:
        Message.error(err.msg);
        break;
    }
  });
  ipcRenderer.send("_init");

  initObservableBridge();
  await initConfig(modal);
}
