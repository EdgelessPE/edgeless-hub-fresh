import { IconGift } from "@arco-design/web-react/icon";
import { Button, Space } from "@arco-design/web-react";
import { reportIssue } from "@/pages/Burn/utils";
import { BurnTabProps } from "./type";
import React from "react";

export const TabFinish = ({ next, sharedState }: BurnTabProps) => {
  return (
    <div className="smt__container">
      <IconGift className="smt__icon" />
      <div>
        <h1>你的 Edgeless 启动盘已就绪</h1>
        <p>重启后从U盘启动以测试启动盘是否能够正确工作</p>
      </div>
      <Space>
        <Button>如何启动</Button>
        <Button onClick={reportIssue}>反馈问题</Button>
      </Space>
    </div>
  );
};
