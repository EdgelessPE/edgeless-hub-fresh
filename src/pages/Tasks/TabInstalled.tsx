import {CardInstalled} from "@/pages/Tasks/CardInstalled";
import {PluginDataLocal} from "@/class";
import React from "react";
import {formatSize} from "@/utils";
import {sizeAlertConstants} from "@/constants";
import {Tag} from "@arco-design/web-react";

export interface TabInstalledProps {
  array: PluginDataLocal[]
}

export const TabInstalled = ({array}: TabInstalledProps) => {
  let result: React.ReactElement[] = []
  for (let node of array) {
    result.push(<CardInstalled key={node.name} local={node}/>)
  }

  //启动速度提示
  const totalSize = array.reduce((prev, cur) => {
      const disabled = cur.attr?.includes("f") ?? false,
        localboost = cur.attr?.includes("l") ?? false
      if (disabled || localboost) return prev
      else return prev + cur.size
    }, 0),
    {orange, red, green} = sizeAlertConstants.all
  let bootSpeedAlert: React.ReactElement
  if (totalSize > red) bootSpeedAlert = <Tag color="red">慢</Tag>
  else if (totalSize > orange) bootSpeedAlert = <Tag color="orange">较慢</Tag>
  else if (totalSize < green) bootSpeedAlert = <Tag color="green">较快</Tag>
  else bootSpeedAlert = <Tag>一般</Tag>

  return (
    <div>
      <div className="tasks__header-tip">
        {"已启用 " + formatSize(totalSize).toString()}
        <span style={{marginLeft: "16px"}}>预估启动速度</span>
        <div style={{display: "inline-block", marginLeft: "4px"}}>{bootSpeedAlert}</div>
      </div>
      {result}
    </div>
  )
}
