import { IconCloudDownload } from "@arco-design/web-react/icon";
import { Button, Space } from "@arco-design/web-react";
import {
  NaiveProgressBar,
  NaiveProgressBarTask,
} from "@/components/molecules/NaiveProgressBar";
import React, { useState } from "react";
import { formatSize } from "@/utils/formatter";
import { UpdateTabProps } from "./type";

type TaskInfo = NaiveProgressBarTask & { enable: boolean };

export const TabDownloading = ({ next, sharedState }: UpdateTabProps) => {
  const emptyTask: TaskInfo = {
    enable: false,
    percent: 0,
    totalSize: 0,
    fileName: "等待中...",
  };
  const [taskImage, setTaskImage] = useState<TaskInfo>({
      enable: true,
      percent: 14,
      totalSize: 809 * 1024 * 1024,
      fileName: "Edgeless_Beta_4.1.0.iso",
    }),
    [taskVentoy, setTaskVentoy] = useState<TaskInfo>({
      enable: true,
      percent: 45,
      totalSize: 15597 * 1024,
      fileName: "ventoy-1.0.79-windows.zip",
    });

  const totalSize = formatSize(
    [taskImage, taskVentoy].reduce((prev, cur) => {
      if (cur.enable) return cur.totalSize + prev;
      else return prev;
    }, 0)
  );
  return (
    <div className="smt__container">
      <IconCloudDownload className="smt__icon" />
      <div>
        <h1>我们需要下载一些必要的依赖文件</h1>
        <p>{`共计 ${totalSize}，请保持网络连接稳定且可靠`}</p>
      </div>
      <Space direction="vertical" style={{ width: "80%" }}>
        {taskImage.enable && (
          <NaiveProgressBar info={taskImage} colorful="blue" />
        )}
        {taskVentoy.enable && (
          <NaiveProgressBar info={taskVentoy} colorful="blue" />
        )}
      </Space>
      <Button onClick={() => next()}>next</Button>
    </div>
  );
};
