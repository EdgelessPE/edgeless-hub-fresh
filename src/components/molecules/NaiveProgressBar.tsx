import { Progress } from "@arco-design/web-react";
import { formatSize } from "@/utils/formatter";
import React from "react";
import { colorfulProgressBar } from "@/constants";

export interface NaiveProgressBarTask {
  percent: number;
  totalSize: number;
  fileName: string;
}

interface NaiveProgressBarProps {
  info: NaiveProgressBarTask;
  colorful?: keyof typeof colorfulProgressBar;
}

export const NaiveProgressBar = ({ info, colorful }: NaiveProgressBarProps) => {
  let color: Record<string, string> | undefined = undefined;
  if (colorful) {
    color = colorfulProgressBar[colorful];
  }
  return (
    <div className="naive-progress-bar__container">
      <small className="naive-progress-bar__text">{info.fileName}</small>
      <Progress
        percent={info.percent}
        animation
        className="naive-progress-bar__bar"
        showText={false}
        color={color}
      ></Progress>
      <small className="naive-progress-bar__progress">
        {formatSize((info.totalSize * info.percent) / 100) +
          " / " +
          formatSize(info.totalSize) +
          " - " +
          info.percent +
          "%"}
      </small>
    </div>
  );
};
