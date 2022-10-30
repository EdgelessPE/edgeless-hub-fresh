import {CardDownload} from "@/pages/Tasks/CardDownload";
import React from "react";
import {TaskStatus} from "types";
import {FileNodePackageOnline} from "types/online";

export interface TabRunningProps {
  array: {
    data: FileNodePackageOnline;
    status: TaskStatus & { state: "Downloading" | "Installing" | "Pending" };
  }[];
}

export const TabRunning = ({ array }: TabRunningProps) => {
  const result: React.ReactElement[] = [];
  for (const node of array) {
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
