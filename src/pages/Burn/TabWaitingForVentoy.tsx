import {BurnTabProps} from "./type";
import {IconBulb} from "@arco-design/web-react/icon";
import {Button, Popconfirm, Space, Spin} from "@arco-design/web-react";
import React from "react";
import {log} from "@/utils/log";

function launchVentoy() {
  log("Info:Launch ventoy");
}

export const TabWaitingForVentoy = ({next, sharedState}: BurnTabProps) => {
  return (
    <div className="smt__container">
      <IconBulb className="smt__icon" />
      <div>
        <h1>请手动操作 Ventoy 安装程序，将 Ventoy 安装至你的 U 盘</h1>
        <p>通常无需更改其他配置，直接点击“安装”即可</p>
        <p>
          如果默认配置无法启动可以尝试取消勾选“安全启动支持”或修改分区类型为“GPT”
        </p>
      </div>
      <Space direction="vertical">
        <Space>
          <Spin />
          <b>完成后关闭 Ventoy 安装程序以继续</b>
        </Space>
        <Popconfirm
          title="你是否已经完成写入 Ventoy 步骤？"
          okText="已完成"
          cancelText="未完成"
          onOk={() => next("WaitingForSelect")}
          onCancel={launchVentoy}
        >
          <Button type="text">遇到问题？</Button>
        </Popconfirm>
      </Space>
    </div>
  );
};
