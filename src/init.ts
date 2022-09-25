import { initObservableBridge } from "@/bridge/observable";
import { initConfig } from "@/services/config";
import { ipcRenderer } from "electron";
import { Message } from "@arco-design/web-react";
import { InitError } from "../types";
import { log } from "@/utils/log";

export default async function () {
  // 向主进程通知进行初始化并监听是否初始化失败
  ipcRenderer.on("_init-error", (event, err: InitError) => {
    // TODO:区分初始化错误类型并针对性处理
    log(`Error:Init error, type : ${err.type}, msg : ${err.msg}`);
    Message.error(err.msg);
  });
  ipcRenderer.send("_init");

  initObservableBridge();
  await initConfig();
}
