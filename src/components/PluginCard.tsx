import {Card, Progress, Tooltip} from "@arco-design/web-react";
import {
  ArrowUpOutlined,
  CheckOutlined,
  CiCircleOutlined,
  CloudDownloadOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import {NaiveDescription} from "@/components/NaiveDescription";
import React from "react";
import {ParsedFullName, PluginData, TaskStatus} from "@/class";
import {formatSize, log, parsePluginName} from "@/utils";
import ButtonWithIcon from "@/components/ButtonWithIcon";

interface Prop {
  data: PluginData;
  category: string;
  showCategory?: boolean;
}

function renderTitle(title: string, ci: boolean): React.ReactElement {
  return (
    <>
      <Tooltip content={title}>
        <b>{title + " "}</b>
      </Tooltip>
      {ci && (
        <Tooltip content={
          <>此插件包由 <a className="category__card__title__bot-link">Edgeless Bot</a> 自动构建</>
        }>
          <CiCircleOutlined className="category__card__title__ci"/>
        </Tooltip>
      )}
    </>
  )
}

function getDownloadingText(percentage: number) {
  return `下载中 ${percentage}%`
}

function getInstallingText(percentage: number) {
  return `安装中 ${percentage}%`
}

function renderButton(status: TaskStatus, key: string): React.ReactElement {
  const disabledButtonProps = {disabled: true}
  const disabledButtonStyle = {color: "gray", cursor: "initial"}
  const progressStyle = {marginRight: "24px"}
  switch (status.state) {
    case "Available":
      return <ButtonWithIcon key={key} icon={<CloudDownloadOutlined/>} text="获取"/>
    case "Pending":
      return <ButtonWithIcon key={key} icon={<LoadingOutlined/>} text="等待中" props={disabledButtonProps}
                             style={disabledButtonStyle}/>
    case "Downloading":
      return <Progress key={key} size="mini" style={progressStyle} percent={status.percentage!}
                       formatText={getDownloadingText}/>
    case "Installing":
      return <Progress key={key} size="mini" style={progressStyle} status="error" percent={status.percentage!}
                       formatText={getInstallingText}/>
    case "Installed":
      return <ButtonWithIcon key={key} icon={<CheckOutlined/>} text="已安装" props={disabledButtonProps}
                             style={disabledButtonStyle}/>
    case "Upgradable":
      return <ButtonWithIcon key={key} icon={<ArrowUpOutlined/>} text="可更新"/>
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

const PluginCard = ({data, category, showCategory = false}: Prop) => {
  const nameInfoRes = parsePluginName(data.name)
  if (nameInfoRes.err) {
    log(nameInfoRes.val)
    return <></>
  }
  const nameInfo = nameInfoRes.unwrap()
  let description: any = {
    "版本号": nameInfo.version,
    "打包者": nameInfo.author,
    "大小": formatSize(data.size)
  }

  if (showCategory) {
    description = {
      "分类": category,
      ...description,
    }
  }

  return (
    <Card
      className="category__card"
      style={showCategory ? {height: "180px"} : {height: "160px"}}
      title={renderTitle(nameInfo.name, nameInfo.isBot)}
      extra={[renderButton(getPluginTaskStatus(nameInfo, category), nameInfo.name)]}
      hoverable
    >
      <NaiveDescription kvMap={description} keyWidth="90px" rowHeight="10px" addColon={true}/>
    </Card>
  )
}

export default PluginCard
