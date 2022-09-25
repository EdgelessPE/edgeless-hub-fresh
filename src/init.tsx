import { initObservableBridge } from "@/bridge/observable";
import { initConfig, resetConfig } from "@/services/config";
import { ipcRenderer } from "electron";
import { Button, Message, Popconfirm, Space } from "@arco-design/web-react";
import { InitError } from "../types";
import { log } from "@/utils/log";
import bridge from "@/bridge/method";

export default async function (modal: any) {
  // 向主进程通知进行初始化并监听是否初始化失败
  ipcRenderer.on("_init-error", (event, err: InitError) => {
    // TODO:区分初始化错误类型并针对性处理
    log(`Error:Init error, type : ${err.type}, msg : ${err.msg}`);
    switch (err.type) {
      case "Config":
        modal.error({
          title: "Hub 配置文件已损坏",
          content: err.msg,
          okText: "重置",
          okButtonProps: {
            type: "primary",
            status: "danger",
          },
          cancelText: "退出",
          footer: (
            <Space>
              <Popconfirm
                title="这会导致你丢失镜像站等重要的自定义配置，是否继续？"
                onOk={async () => {
                  await resetConfig();
                  await bridge("restartWindow");
                }}
                okButtonProps={{
                  type: "primary",
                  status: "danger",
                }}
                okText="继续"
                cancelText="取消"
              >
                <Button type="primary" status="danger">
                  重置配置
                </Button>
              </Popconfirm>
              <Button
                onClick={async () => {
                  await bridge("closeWindow");
                }}
              >
                退出程序
              </Button>
            </Space>
          ),
          escToExit: false,
          maskClosable: false,
        });
        break;
      default:
        Message.error(err.msg);
        break;
    }
  });
  ipcRenderer.send("_init");

  initObservableBridge();
  await initConfig();
}
