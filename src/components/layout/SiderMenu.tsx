import { Menu } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { BrowserHistory } from "history";
import { getRouterPath } from "@/router/utils";
import { useSiderNodes } from "@/components/layout/useSiderNodes";

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

function getCurrentOpenStatus() {
  const s = getRouterPath();
  if (s.length >= 3) {
    //说明是category或detail页面，定位至分类
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
      {useSiderNodes()}
    </Menu>
  );
};
