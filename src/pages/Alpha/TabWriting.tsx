import { DeploymentUnitOutlined } from "@ant-design/icons";
import { Button, Progress } from "@arco-design/web-react";
import { colorfulProgressBar } from "@/constants";
import { formatSize } from "@/utils";
import { useState } from "react";
import { AlphaTabProps } from "./class";

export const TabWriting = ({ next, sharedState }: AlphaTabProps) => {
  const [copyStatus, setCopyStatus] = useState({
    totalSize: 809 * 1024 * 1024,
    writtenSize: 700 * 1024 * 1024,
  });
  return (
    <div className="smt__container">
      <DeploymentUnitOutlined className="smt__icon" />
      <div>
        <h1>正在更新 E 盘中的 Edgeless 依赖文件</h1>
        <p>稍安勿躁，新的启动盘很快就好</p>
      </div>
      <Progress
        percent={(100 * copyStatus.writtenSize) / copyStatus.totalSize}
        animation
        color={colorfulProgressBar.red}
        width="80%"
        formatText={(percent) => {
          return `${formatSize(copyStatus.writtenSize)} / ${formatSize(
            copyStatus.totalSize
          )} - ${percent.toFixed(2)}%`;
        }}
      />
      <Button onClick={() => next()}>next</Button>
    </div>
  );
};
