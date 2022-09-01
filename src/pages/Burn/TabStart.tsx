import {Button, Space} from "@arco-design/web-react";
import {IconFire, IconThunderbolt} from "@arco-design/web-react/icon";
import React from "react";
import {TabProps} from "./class"

export const TabStart = ({next}: TabProps) => {
  return (
    <div className="burn__tab-inner-container">
      <IconFire style={{fontSize: 120, color: "rgb(var(--arcoblue-6))"}}/>
      <Space direction="vertical">
        <h1>准备好拥有属于自己的 Edgeless 启动盘了吗？</h1>
        <div>
          <p>插入一个 U 盘，Hub 会将其制作为 Edgeless 启动盘</p>
          <p>如果你插入了一个 Ventoy 启动盘，则可无损部署 Edgeless</p>
        </div>
      </Space>
      <Button type="primary" size="large" onClick={() => next()}><IconThunderbolt/>立即开始</Button>
    </div>
  )
}
