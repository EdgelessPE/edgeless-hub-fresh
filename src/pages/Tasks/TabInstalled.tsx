import { CardInstalled } from "@/pages/Tasks/CardInstalled";
import React, { useEffect, useState } from "react";
import { formatSize } from "@/utils";
import { sizeAlertConstants } from "@/constants";
import { Checkbox, Select, Tag } from "@arco-design/web-react";
import {
  calcStatusWeight,
  isDisabled,
  isLocalBoost,
} from "@/pages/Tasks/utils";
import { FileNodePackageLocal } from "@/classes/local";

export interface TabInstalledProps {
  array: FileNodePackageLocal[];
}

const sortMethodMap: Record<
  string,
  (a: FileNodePackageLocal, b: FileNodePackageLocal) => number
> = {
  name: (a, b) => a.name.localeCompare(b.name),
  status: (a, b) => {
    const x = calcStatusWeight(a),
      y = calcStatusWeight(b);
    if (x - y != 0) return x - y;
    else return a.name.localeCompare(b.name);
  },
  size: (a, b) => b.size - a.size,
};

export const TabInstalled = ({ array }: TabInstalledProps) => {
  const [sortBy, setSortBy] = useState("name");
  const [nodes, setNodes] = useState<React.ReactElement[]>([]);
  const [ignoreDisabled, setIgnoreDisabled] = useState(false);

  //排序函数
  const reSort = (method: string) => {
    setSortBy(method);
    let res = [];
    for (let node of array.sort(sortMethodMap[method])) {
      if (!ignoreDisabled || !isDisabled(node))
        res.push(<CardInstalled key={node.name} local={node} />);
    }
    setNodes(res);
  };
  useEffect(() => reSort(sortBy), [ignoreDisabled]);

  //启动速度提示
  const totalSize = array.reduce((prev, cur) => {
      const disabled = isDisabled(cur),
        localboost = isLocalBoost(cur);
      if (disabled || localboost) return prev;
      else return prev + cur.size;
    }, 0),
    { orange, red, green } = sizeAlertConstants.all;
  let bootSpeedAlert: React.ReactElement;
  if (totalSize > red) bootSpeedAlert = <Tag color="red">慢</Tag>;
  else if (totalSize > orange) bootSpeedAlert = <Tag color="orange">较慢</Tag>;
  else if (totalSize < green) bootSpeedAlert = <Tag color="green">较快</Tag>;
  else bootSpeedAlert = <Tag>一般</Tag>;

  return (
    <div className="tasks__tab-content">
      <div className="tasks__header">
        {"启动需加载 " + formatSize(totalSize).toString()}
        <span style={{ marginLeft: "16px" }}>预估启动速度</span>
        <div style={{ display: "inline-block", marginLeft: "4px" }}>
          {bootSpeedAlert}
        </div>

        <Checkbox
          value={ignoreDisabled}
          onChange={setIgnoreDisabled}
          style={{ margin: "0 10px 0 auto" }}
        >
          忽略已禁用
        </Checkbox>
        <span style={{ margin: "0 8px 0 16px" }}>排序方式</span>
        <Select
          size="small"
          style={{ width: "96px", marginRight: "11px" }}
          value={sortBy}
          onChange={reSort}
        >
          <Select.Option key="name" value="name">
            名称
          </Select.Option>
          <Select.Option key="status" value="status">
            状态
          </Select.Option>
          <Select.Option key="size" value="size">
            大小
          </Select.Option>
        </Select>
      </div>
      {nodes}
    </div>
  );
};
