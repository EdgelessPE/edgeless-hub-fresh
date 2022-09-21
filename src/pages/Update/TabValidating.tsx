import { FileSearchOutlined } from "@ant-design/icons";
import { Button, Spin } from "@arco-design/web-react";
import { UpdateTabProps } from "./types";

export const TabValidating = ({ next, sharedState }: UpdateTabProps) => {
  return (
    <div className="smt__container">
      <FileSearchOutlined className="smt__icon" />
      <div>
        <h1>正在校验启动盘完整性</h1>
        <p>校验进度：2 / 3</p>
      </div>
      <Spin size={40} />
      <Button onClick={() => next()}>next</Button>
    </div>
  );
};
