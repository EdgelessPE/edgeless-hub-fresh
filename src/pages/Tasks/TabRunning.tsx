import {CardDownload} from "@/pages/Tasks/CardDownload";
import React from "react";
import {TaskStatus} from "@/../../../classes";
import {FileNodePackageOnline} from "@/../../../classes/online";

export interface TabRunningProps {
  array: {
    data: FileNodePackageOnline;
    status: TaskStatus & { state: "Downloading" | "Installing" | "Pending" };
  }[];
}

export const TabRunning = ({array}: TabRunningProps) => {
  let result: React.ReactElement[] = [];
  for (let node of array) {
    result.push(
      <CardDownload
        key={node.data.name}
        data={node.data}
        status={node.status}
      />
    );
  }
  return <div className="tasks__tab-content">{result}</div>;
};
