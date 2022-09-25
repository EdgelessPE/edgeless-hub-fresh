import { Button, Popconfirm, Space } from "@arco-design/web-react";
import { resetConfig } from "@/services/config";
import bridge from "@/bridge/method";
import { ConfirmProps } from "@arco-design/web-react/es/Modal/confirm";

export const configError = (msg: string): ConfirmProps => {
  return {
    title: "Hub 配置文件已损坏",
    content: msg,
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
  };
};
