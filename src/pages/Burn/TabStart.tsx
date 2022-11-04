import {Dropdown, Menu, Message, Modal, Space} from "@arco-design/web-react";
import {IconDelete, IconFire, IconQuestionCircle, IconThunderbolt,} from "@arco-design/web-react/icon";
import React from "react";
import {BurnTabProps} from "./type";

export const TabStart = ({next, sharedState}: BurnTabProps) => {
  const confirmCleanCache = () => {
    Modal.confirm({
      title:
        "清理缓存后需要重新下载依赖文件。如果你确实遇到了制作错误请点击“确认删除”，然后尝试重新制作。",
      okText: "确认删除",
      onOk: async () => {
        Message.info({
          content: "下载缓存已清理",
        });
      },
    });
  };
  return (
    <div className="smt__container">
      <IconFire className="smt__icon" />
      <Space direction="vertical">
        <h1>准备好拥有属于自己的 Edgeless 启动盘了吗？</h1>
        <div>
          <p>插入一个 U 盘，Hub 会将其制作为 Edgeless 启动盘</p>
          <p>如果你插入了一个 Ventoy 启动盘，则可无损部署 Edgeless</p>
        </div>
      </Space>

      <Dropdown.Button
        type="primary"
        size="large"
        onClick={() => next()}
        droplist={
          <Menu>
            <Menu.Item key="cache" onClick={confirmCleanCache}>
              <IconDelete />
              清理缓存
            </Menu.Item>
            <Menu.Item key="issue">
              <IconQuestionCircle />
              遇到问题
            </Menu.Item>
          </Menu>
        }
      >
        <IconThunderbolt />
        立即开始
      </Dropdown.Button>
    </div>
  );
};
