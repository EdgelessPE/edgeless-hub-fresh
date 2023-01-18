import React, { useEffect, useState } from "react";
import { iconMapCategory, siderNodes } from "@/constants";
import { getHello } from "@/services/ept";
import { log } from "@/utils/log";
import { SiderNode } from "@/components/layout/SiderMenu";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { cmpPinYin } from "@/utils/sort";
import { Menu } from "@arco-design/web-react";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

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

function useSiderNodes() {
  const [node, setNode] = useState(renderSiderMenu(siderNodes));

  // 异步地对插件包分类打补丁
  useEffect(() => {
    setTimeout(() => {
      getHello().then((hello) => {
        // 生成分类数组
        const categories: string[] = [];
        const tree = hello.unwrap().plugins?.tree;
        if (tree == null) {
          log(`Error:Current mirror doesn't provide plugins`);
          return;
        }
        for (const key in tree) {
          categories.push(key);
        }

        // 生成侧边栏节点
        const siderNode: SiderNode[] = categories
          .sort(cmpPinYin)
          .map((cate) => {
            return {
              path: `plugin/category/${cate}`,
              title: cate,
              icon: iconMapCategory[cate] ?? <QuestionCircleOutlined />,
            };
          });

        // 补充到插件节点
        setNode(() => {
          for (const n of siderNodes) {
            if (n.path == "pluginEmpty") {
              n.children = siderNode;
              n.path = "plugin";
              break;
            }
          }
          return renderSiderMenu(siderNodes);
        });
      });
    }, 1000);
  }, []);

  return node;
}

export { useSiderNodes };
