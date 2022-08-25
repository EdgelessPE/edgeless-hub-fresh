import {ParsedFullName, TaskStatus} from "@/class";
import React from "react";
import {ButtonWithIcon} from "@/components/atoms/ButtonWithIcon";
import {ArrowUpOutlined, CheckOutlined, CloudDownloadOutlined, LoadingOutlined} from "@ant-design/icons";
import {Progress} from "@arco-design/web-react";

function getDownloadingText(percentage: number) {
  return `下载中 ${percentage}%`
}

function getInstallingText(percentage: number) {
  return `安装中 ${percentage}%`
}

function renderProgress(key: string, status: "normal" | "error", percentage: number, formatText: (p: number) => string): React.ReactElement {
  return (
    <div key={key} className="plugin-button__progress-container">
      <Progress key={key} size="mini" status={status} percent={percentage}
                formatText={formatText}/>
    </div>
  )
}

function renderButton(status: TaskStatus, key: string): React.ReactElement {
  const disabledButtonProps = {disabled: true}
  const disabledButtonStyle = {color: "gray", cursor: "initial"}
  switch (status.state) {
    case "Available":
      return <ButtonWithIcon key={key} icon={<CloudDownloadOutlined/>} text="获取"/>
    case "Pending":
      return <ButtonWithIcon key={key} icon={<LoadingOutlined/>} text="等待中" props={disabledButtonProps}
                             style={disabledButtonStyle}/>
    case "Downloading":
      return renderProgress(key, "normal", status.percentage!, getDownloadingText)
    case "Installing":
      return renderProgress(key, "error", status.percentage!, getInstallingText)
    case "Installed":
      return <ButtonWithIcon key={key} icon={<CheckOutlined/>} text="已安装" props={disabledButtonProps}
                             style={disabledButtonStyle}/>
    case "Upgradable":
      return <ButtonWithIcon key={key} icon={<ArrowUpOutlined/>} text="更新"/>
    default:
      return <></>
  }
}

let count = 0

function getPluginTaskStatus(info: ParsedFullName, category: string): TaskStatus {
  let state: TaskStatus['state']
  switch (count % 6) {
    case 0:
      state = "Upgradable"
      break
    case 1:
      state = "Pending"
      break
    case 2:
      state = "Downloading"
      break
    case 3:
      state = "Installing"
      break
    case 4:
      state = "Installed"
      break
    default:
      state = "Available"
      break
  }
  count++
  return {
    state,
    versionLocal: "0.0.0",
    versionOnline: info.version,
    percentage: parseFloat((Math.random() * 100).toFixed(2))
  }
}

export const PluginSmartButton = ({info, category}: { info: ParsedFullName, category: string }) => {
  const status = getPluginTaskStatus(info, category)
  return renderButton(status, info.name + "_button")
}

