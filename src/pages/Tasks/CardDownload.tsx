import { TaskStatus } from "@/classes";
import { formatSize, parsePackageName } from "@/utils";
import { Progress } from "@arco-design/web-react";
import React from "react";
import { colorfulProgressBar } from "@/constants";
import { FileNodePackageOnline } from "@/classes/online";

interface Props {
  data: FileNodePackageOnline;
  status: TaskStatus & { state: "Downloading" | "Installing" | "Pending" };
}

interface LastNode {
  percentage: number;
  time: number;
}

let lastMap = new Map<string, LastNode>();

export const CardDownload = ({ data, status }: Props) => {
  if (status.state == "Pending" || status.percentage == null)
    status.percentage = 0;

  const parsed = parsePackageName(data.name).unwrap(),
    id = data.name;

  //生成速度信息
  const now = Date.now();
  if (!lastMap.has(id)) lastMap.set(id, { percentage: 0, time: now - 1000 });
  const last = lastMap.get(id)!;
  const diffSize = ((status.percentage - last.percentage) * data.size) / 100;
  const diffTimeS = (now - last.time) / 1000;
  const speed = diffSize / diffTimeS;
  lastMap.set(id, {
    percentage: status.percentage,
    time: now,
  });

  //判断color
  let color: string | { [p: string]: string };
  switch (status.state) {
    case "Downloading":
      color = colorfulProgressBar.blue;
      break;
    case "Installing":
      color = colorfulProgressBar.red;
      break;
    default:
      color = "#C9CDD4";
      break;
  }

  return (
    <div key={id} className="tasks__card__container">
      <h3 className="tasks__card__title">{parsed.name}</h3>
      {status.state != "Pending" ? (
        <div>
          {formatSize((data.size * status.percentage) / 100) +
            " / " +
            formatSize(data.size) +
            ` - ${formatSize(speed)}/s`}
        </div>
      ) : (
        <div>{formatSize(data.size).toString()}</div>
      )}
      <Progress
        percent={status.percentage}
        color={color}
        animation
        width="100%"
        formatText={(percent) => {
          switch (status.state) {
            case "Downloading":
              return `下载中 ${percent}%`;
            case "Installing":
              return `安装中 ${percent}%`;
            case "Pending":
              return "等待中...";
            default:
              return `${percent}%`;
          }
        }}
      />
    </div>
  );
};
