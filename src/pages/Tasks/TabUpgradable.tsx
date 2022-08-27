import {CardUpdate} from "@/pages/Tasks/CardUpdate";
import {PluginDataLocal, PluginDataOnline} from "@/class";
import React from "react";

export interface TabUpgradableProps {
  array: {
    online: PluginDataOnline
    local: PluginDataLocal
  }[]
}

export const TabUpgradable = ({array}: TabUpgradableProps) => {
  let result: React.ReactElement[] = []
  for (let node of array) {
    result.push((
      <CardUpdate key={node.local.name} online={node.online} local={node.local}/>
    ))
  }
  return (
    <div>
      {result}
    </div>
  )
}
