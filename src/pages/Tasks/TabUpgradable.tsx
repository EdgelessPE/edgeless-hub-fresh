import {CardUpdate} from "@/pages/Tasks/CardUpdate";
import {PluginDataLocal, PluginDataOnline} from "@/class";
import React from "react";
import {ButtonWithIcon} from "@/components/atoms/ButtonWithIcon";
import {ArrowUpOutlined} from "@ant-design/icons";
import {formatSize} from "@/utils";

export interface TabUpgradableProps {
  array: {
    online: PluginDataOnline
    local: PluginDataLocal
  }[],
  onUpgradeAll: () => void
}

export const TabUpgradable = ({array, onUpgradeAll}: TabUpgradableProps) => {
  let result: React.ReactElement[] = []
  for (let node of array) {
    result.push((
      <CardUpdate key={node.local.name} online={node.online} local={node.local}/>
    ))
  }
  const upgradableTotalSize = array.reduce((prev, cur) => {
    return prev + cur.online.size
  }, 0)
  return (
    <div>
      <ButtonWithIcon icon={<ArrowUpOutlined/>} text={`全部更新（${formatSize(upgradableTotalSize)}）`}
                      props={{type: "primary", size: "large", onClick: onUpgradeAll}}
                      style={{width: "196px", margin: "0 0 16px 5px"}}/>
      {result}
    </div>
  )
}
