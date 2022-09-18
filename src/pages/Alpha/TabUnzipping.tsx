import { IconArchive } from "@arco-design/web-react/icon";
import { Button, Spin } from "@arco-design/web-react";
import { AlphaTabProps } from "./class";

export const TabUnzipping = ({ next, sharedState }: AlphaTabProps) => {
  return (
    <div className="smt__container">
      <IconArchive className="smt__icon" />
      <div>
        <h1>正在生成 Edgeless 依赖文件</h1>
        <p>处理进度：0 / 1</p>
      </div>
      <Spin size={40} />
      <Button onClick={() => next()}>next</Button>
    </div>
  );
};
