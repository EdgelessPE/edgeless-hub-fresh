import {CardDownload} from "@/pages/Tasks/CardDownload";
import React from "react";
import {PluginDataOnline, TaskStatus} from "@/class";

export interface TabRunningProps {
  array: {
    data: PluginDataOnline,
    status: TaskStatus & { state: "Downloading" | "Installing" | "Pending" }
  }[]
}

export const TabRunning = ({array}: TabRunningProps) => {
  let result: React.ReactElement[] = []
  for (let node of array) {
    result.push((
      <CardDownload
        key={node.data.name}
        data={node.data}
        status={node.status}
      />
    ))
  }
  return (
    <div className="tasks__tab-content">
      {result}
    </div>
  )
}
