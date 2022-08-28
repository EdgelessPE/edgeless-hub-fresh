import {CardUpdate} from "@/pages/Tasks/CardUpdate";
import {PluginDataLocal, PluginDataOnline} from "@/class";
import React, {useState} from "react";
import {ButtonWithIcon} from "@/components/atoms/ButtonWithIcon";
import {ArrowUpOutlined} from "@ant-design/icons";
import {formatSize} from "@/utils";
import {Checkbox} from "@arco-design/web-react";
import {isDisabled} from "@/pages/Tasks/utils";

export interface TabUpgradableProps {
  array: {
    online: PluginDataOnline
    local: PluginDataLocal
  }[],
  onUpgradeAll: (arr: {
    online: PluginDataOnline
    local: PluginDataLocal
  }[]) => void
}

export const TabUpgradable = ({array, onUpgradeAll}: TabUpgradableProps) => {
  const [ignoreDisabled, setIgnoreDisabled] = useState(false)

  let result: React.ReactElement[] = []
  for (let node of array) {
    if (!ignoreDisabled || !isDisabled(node.local)) result.push((
      <CardUpdate key={node.local.name} online={node.online} local={node.local}/>
    ))
  }

  const onClickUpgradeAll = () => {
    onUpgradeAll(array.filter(node => {
      if (!ignoreDisabled || !isDisabled(node.local)) return true
      else return false
    }))
  }

  const upgradableTotalSize = array.reduce((prev, cur) => {
    return prev + cur.online.size
  }, 0)
  return (
    <div className="tasks__tab-content">
      <div className="tasks__header">
        <ButtonWithIcon icon={<ArrowUpOutlined/>} text={`全部更新（${formatSize(upgradableTotalSize)}）`}
                        props={{type: "primary", size: "large", onClick: onClickUpgradeAll}}
                        style={{width: "196px", marginRight: "12px"}}/>
        <Checkbox value={ignoreDisabled} onChange={setIgnoreDisabled}>忽略已禁用</Checkbox>
      </div>
      {result}
    </div>
  )
}
