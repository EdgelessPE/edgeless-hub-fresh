import {Progress} from "@arco-design/web-react";
import {formatSize} from "@/utils";
import React from "react";

export interface NaiveProgressBarTask {
  percent: number
  totalSize: number
  fileName: string
}

interface NaiveProgressBarProps {
  info: NaiveProgressBarTask
}

export const NaiveProgressBar = ({info}: NaiveProgressBarProps) => {
  return (
    <div className="naive-progress-bar__container">
      <small className="naive-progress-bar__text">{info.fileName}</small>
      <Progress
        percent={info.percent}
        animation
        className="naive-progress-bar__bar"
        showText={false}
      ></Progress>
      <small className="naive-progress-bar__progress">
        {formatSize(info.totalSize * info.percent / 100) + " / " + formatSize(info.totalSize)}
      </small>
    </div>
  )
}
