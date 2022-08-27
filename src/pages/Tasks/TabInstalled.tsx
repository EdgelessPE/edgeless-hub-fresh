import {CardInstalled} from "@/pages/Tasks/CardInstalled";
import {PluginDataLocal} from "@/class";
import React from "react";

export interface TabInstalledProps {
  array: PluginDataLocal[]
}

export const TabInstalled = ({array}: TabInstalledProps) => {
  let result: React.ReactElement[] = []
  for (let node of array) {
    result.push(<CardInstalled key={node.name} local={node}/>)
  }
  return (
    <div>
      {result}
    </div>
  )
}
