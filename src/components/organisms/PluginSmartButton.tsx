import { TaskStatus } from "types";
import { PluginParsedFullName } from "types/parsed";
import React, { useEffect, useState } from "react";
import { ButtonWithIcon } from "@/components/atoms/ButtonWithIcon";
import {
  ArrowUpOutlined,
  CheckOutlined,
  CloudDownloadOutlined,
  LoadingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Progress } from "@arco-design/web-react";
import { eptInstall } from "@/services/ept";
import { bindTask, listenTask, unListenTask } from "@/services/taskBinder";
import { getPluginKey } from "@/utils/parser";

function getDownloadingText(percentage: number) {
  return `下载中 ${percentage}%`;
}

function getInstallingText(percentage: number) {
  return `安装中 ${percentage}%`;
}

function renderProgress(
  key: string,
  status: "normal" | "error",
  percentage: number,
  formatText: (p: number) => string
): React.ReactElement {
  return (
    <div key={key} className="plugin-button__progress-container">
      <Progress
        key={key}
        size="mini"
        status={status}
        percent={percentage}
        formatText={formatText}
      />
    </div>
  );
}

//TODO:无法下载的情况：
// 1、fs为只读，在启动盘嗅探时进行读写测试
// 2、超过3天没有检测到启动盘
function renderButton(status: TaskStatus, packageName: string, pluginKey: string): React.ReactElement {
  const disabledButtonProps = {disabled: true};
  const disabledButtonStyle = {color: "gray", cursor: "initial"};
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const percentage = status.percentage!
  switch (status.state) {
    case "Available":
      return (
        <ButtonWithIcon
          key={packageName}
          icon={<CloudDownloadOutlined />}
          text="获取"
          onClick={async () => {
            const res = await eptInstall(packageName);
            bindTask(pluginKey, {
              pool: "addPackage",
              id: res.unwrap(),
            });
          }}
        />
      );
    case "Pending":
      return (
        <ButtonWithIcon
          key={packageName}
          icon={<LoadingOutlined />}
          text="等待中"
          buttonProps={disabledButtonProps}
          style={disabledButtonStyle}
        />
      );
    case "Downloading":
      return renderProgress(
        packageName,
        "normal",
        percentage,
        getDownloadingText
      );
    case "Installing":
      return renderProgress(
        packageName,
        "error",
        percentage,
        getInstallingText
      );
    case "Installed":
      return (
        <ButtonWithIcon
          key={packageName}
          icon={<CheckOutlined />}
          text="已安装"
          buttonProps={disabledButtonProps}
          style={disabledButtonStyle}
        />
      );
    case "Upgradable":
      return (
        <ButtonWithIcon
          key={packageName}
          icon={<ArrowUpOutlined />}
          text="更新"
        />
      );
    case "Error":
      return (
        <ButtonWithIcon
          key={packageName}
          icon={<WarningOutlined />}
          text="错误"
        />
      );
    default:
      return <></>;
  }
}


export const PluginSmartButton = ({
  info,
  fullName,
  category,
}: {
  info: PluginParsedFullName;
  fullName: string;
  category: string;
}) => {
  const key = getPluginKey(category, fullName);
  const [status, setStatus] = useState<TaskStatus>({
    state: "Available",
  });
  useEffect(() => {
    listenTask(key, setStatus);
    return () => {
      unListenTask(key, setStatus);
    };
  }, []);

  return renderButton(status, info.name, key);
};
