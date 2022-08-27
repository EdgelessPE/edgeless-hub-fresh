import {PluginDataLocal} from "@/class";
import {NaiveDescription} from "@/components/molecules/NaiveDescription";
import {formatSize, parsePluginName} from "@/utils";
import React from "react";
import {Dropdown, Menu, Tag} from "@arco-design/web-react";
import {SizeAlert} from "@/components/molecules/SizeAlert";

interface Props {
  local: PluginDataLocal
}

export const CardInstalled = ({local}: Props) => {
  const parsed = parsePluginName(local.name).unwrap()
  const disabled = local.attr?.includes("f") ?? false,
    localboost = local.attr?.includes("l") ?? false

  let descriptions: Record<string, string | React.ReactElement> = {
    "版本号": parsed.version,
    "占用": <div><SizeAlert size={local.size}/> {formatSize(local.size).toString()}</div>,
  }
  if (localboost) {
    descriptions['属性'] = <Tag color="cyan">LocalBoost</Tag>
  }
  return (
    <div className="tasks__card__container">
      <div className="tasks__card__header">
        <h3 className="tasks__card__header__title">
          <span style={disabled ? {
            marginRight: "4px",
            color: "gray",
            textDecoration: "line-through"
          } : {marginRight: "4px"}}>{parsed.name}</span>
        </h3>
        <Dropdown.Button
          type={disabled ? "primary" : "secondary"}
          droplist={
            <Menu>
              <Menu.Item key="localboost">
                {localboost ? "取消 LocalBoost 启动" : "应用 LocalBoost 启动"}
              </Menu.Item>
              <Menu.Item key="delete">
                删除
              </Menu.Item>
            </Menu>
          }
        >
          {disabled ? "启用" : "禁用"}
        </Dropdown.Button>
      </div>
      <NaiveDescription kvMap={descriptions} keyWidth="64px" rowHeight="24px" addColon style={{textAlign: "start"}}/>
    </div>
  )
}
