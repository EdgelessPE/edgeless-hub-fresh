import {PluginData, TaskStatus} from "@/class";
import {formatSize, parsePluginName} from "@/utils";
import {Progress} from "@arco-design/web-react";
import {NaiveDescription} from "@/components/molecules/NaiveDescription";
import {ButtonWithIcon} from "@/components/atoms/ButtonWithIcon";
import {ArrowUpOutlined, StopOutlined} from "@ant-design/icons";
import React from "react";

interface Props {
  data: PluginData
  status: TaskStatus
  id: string
}

interface LastNode {
  percentage: number
  time: number
}

let lastMap = new Map<string, LastNode>()

export const DownloadCard = ({data, status, id}: Props) => {
  if (status.percentage == null) return <></>
  if (status.state == "Available") return <></>
  if (status.state == "Pending") status.percentage = 0

  const parsed = parsePluginName(data.name).unwrap()

  //生成速度信息
  const now = Date.now()
  if (!lastMap.has(id)) lastMap.set(id, {percentage: 0, time: now - 1000})
  const last = lastMap.get(id)!
  const diffSize = (status.percentage - last.percentage) * data.size / 100
  const diffTimeS = (now - last.time) / 1000
  const speed = diffSize / diffTimeS
  lastMap.set(id, {
    percentage: status.percentage,
    time: now
  })

  //判断color
  let color: string | { [p: string]: string }
  switch (status.state) {
    case "Downloading":
      color = {
        "0%": "#4f9af8",
        "100%": "#5bc7fa"
      }
      break
    case "Installing":
      color = {
        "0%": "#e24f48",
        "100%": "#ef8432"
      }
      break
    default:
      color = "#C9CDD4"
      break
  }

  const progressComponent = (
    <>
      <h3 className="tasks__download-card__title">{parsed.name}</h3>
      <div>{formatSize(data.size * status.percentage / 100) + " / " + formatSize(data.size) + ` - ${formatSize(speed)}/s`}</div>
      <Progress
        percent={status.percentage}
        color={color}
        animation
        width='100%'
        formatText={percent => {
          switch (status.state) {
            case "Downloading":
              return `下载中 ${percent}%`
            case "Installing":
              return `安装中 ${percent}%`
            case "Pending":
              return "等待中 0%"
            default:
              return `${percent}%`
          }
        }}
      /></>
  )

  const installedComponent = (
    <>
      <div className="tasks__download-card__header">
        <h3 className="tasks__download-card__header__title">{parsed.name}</h3>
        <ButtonWithIcon icon={<StopOutlined/>} text="禁用"/>
      </div>
      <NaiveDescription kvMap={{
        "版本号": status.versionLocal,
        "占用": formatSize(data.size).toString()
      }} keyWidth="64px" rowHeight="24px" addColon style={{textAlign: "start"}}/>
    </>
  )

  const updateComponent = (
    <>
      <div className="tasks__download-card__header">
        <h3 className="tasks__download-card__header__title">{parsed.name}</h3>
        <ButtonWithIcon icon={<ArrowUpOutlined/>} text="更新"/>
      </div>
      <NaiveDescription kvMap={{
        "可更新": status.versionLocal + " -> " + status.versionOnline,
        "需占用": formatSize(data.size).toString()
      }} keyWidth="64px" rowHeight="24px" addColon style={{textAlign: "start"}}/>
    </>
  )

  return (
    <div id={id} className="tasks__download-card__container">
      {(status.state == "Downloading" || status.state == "Installing" || status.state == "Pending") && progressComponent}
      {status.state == "Installed" && installedComponent}
      {status.state == "Upgradable" && updateComponent}
    </div>
  )
}
