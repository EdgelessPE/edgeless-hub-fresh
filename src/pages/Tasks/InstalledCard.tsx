import {PluginDataLocal} from "@/class";
import {ButtonWithIcon} from "@/components/atoms/ButtonWithIcon";
import {StopOutlined} from "@ant-design/icons";
import {NaiveDescription} from "@/components/molecules/NaiveDescription";
import {formatSize, parsePluginName} from "@/utils";
import React from "react";

interface Props {
  local: PluginDataLocal
}

export const InstalledCard = ({local}: Props) => {
  const parsed = parsePluginName(local.name).unwrap()
  return (
    <div className="tasks__card__container">
      <div className="tasks__card__header">
        <h3 className="tasks__card__header__title">{parsed.name}</h3>
        <ButtonWithIcon icon={<StopOutlined/>} text="禁用"/>
      </div>
      <NaiveDescription kvMap={{
        "版本号": parsed.version,
        "占用": formatSize(local.size).toString()
      }} keyWidth="64px" rowHeight="24px" addColon style={{textAlign: "start"}}/>
    </div>
  )
}
