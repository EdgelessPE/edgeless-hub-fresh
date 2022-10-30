import {Menu} from "@arco-design/web-react";
import React, {useEffect, useState} from "react";
import {BrowserHistory} from "history";
import {siderNodes} from "@/constants";
import {getRouterPath} from "@/router/utils";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface Prop {
  history: BrowserHistory;
}

export interface SiderNode {
  path: string;
  title: string;
  icon?: JSX.Element;
  children?: SiderNode[];
  hide?: boolean;
}

function renderSiderMenu(input: SiderNode[]): JSX.Element[] {
  const result: JSX.Element[] = [];
  for (const node of input) {
    if (node.hide) continue;
    if (node.children != null) {
      const children = renderSiderMenu(node.children);
      result.push(
        <SubMenu
          key={node.path}
          title={
            <span className="sider__title">
              {node.icon}
              {node.title}
            </span>
          }
        >
          {children}
        </SubMenu>
      );
    } else {
      result.push(
        <MenuItem key={node.path}>
          {node.icon}
          {node.title}
        </MenuItem>
      );
    }
  }
  return result;
}

function getCurrentOpenStatus() {
  const s = getRouterPath();
  if (s.length == 4) {
    //说明是detail页面，定位至分类
    return {
      sub: ["plugin"],
      keys: [`plugin/category/${s[2]}`],
    };
  } else if (s.length > 1) {
    return {
      sub: [s[0]],
      keys: [s.join("/")],
    };
  } else {
    return {
      sub: [],
      keys: s,
    };
  }
}

export const SiderMenu = ({ history }: Prop) => {
  const initStatus = getCurrentOpenStatus();
  const [selectedKeys, setSelectedKeys] = useState(initStatus.keys);
  const [openKeys, setOpenKeys] = useState(initStatus.sub);

  //监听路由变化以更新侧边栏状态
  useEffect(() => {
    history.listen(() => {
      const status = getCurrentOpenStatus();
      // console.log(status);
      setSelectedKeys(status.keys);
      setOpenKeys(status.sub);
    });
  }, []);

  return (
    <Menu
      style={{ width: "100%" }}
      selectedKeys={selectedKeys}
      onClickMenuItem={(key) => {
        setSelectedKeys([key]);
        if (key == "home") key = "";
        history.push("/" + key);
      }}
      openKeys={openKeys}
      onClickSubMenu={(_, openKeys) => {
        setOpenKeys(openKeys);
      }}
    >
      {renderSiderMenu(siderNodes)}
    </Menu>
  );
};
