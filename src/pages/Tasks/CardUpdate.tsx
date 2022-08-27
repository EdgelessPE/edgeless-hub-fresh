import {PluginDataLocal, PluginDataOnline} from "@/class";
import {ButtonWithIcon} from "@/components/atoms/ButtonWithIcon";
import {ArrowUpOutlined} from "@ant-design/icons";
import {NaiveDescription} from "@/components/molecules/NaiveDescription";
import {formatSize, parsePluginName} from "@/utils";
import React from "react";
import {Tag} from "@arco-design/web-react";
import {IconCaretDown, IconCaretUp, IconMinusCircle} from "@arco-design/web-react/icon";

interface Props {
  online: PluginDataOnline
  local: PluginDataLocal
}

export const CardUpdate = ({local, online}: Props) => {
  const parsedOnline = parsePluginName(online.name).unwrap(),
    parsedLocal = parsePluginName(local.name).unwrap()

  let sizeBadge: React.ReactElement
  const sizeChange = online.size - local.size
  if (sizeChange > 0) {
    sizeBadge = <Tag size="small" icon={<IconCaretUp/>} color="red">{formatSize(sizeChange).toString()}</Tag>
  } else if (sizeChange < 0) {
    sizeBadge = <Tag size="small" icon={<IconCaretDown/>} color="green">{formatSize(-sizeChange).toString()}</Tag>
  } else {
    sizeBadge = <Tag size="small" icon={<IconMinusCircle/>}>0B</Tag>
  }

  return (
    <div className="tasks__card__container">
      <div className="tasks__card__header">
        <h3 className="tasks__card__header__title">{parsedLocal.name}</h3>
        <ButtonWithIcon icon={<ArrowUpOutlined/>} text="更新" props={{type: "primary"}}/>
      </div>
      <NaiveDescription kvMap={{
        "可更新": parsedLocal.version + " -> " + parsedOnline.version,
        "占用": <div>{formatSize(local.size).toString() + " -> " + formatSize(online.size).toString()} {sizeBadge}</div>
      }} keyWidth="64px" rowHeight="24px" addColon style={{textAlign: "start"}}/>
    </div>
  )
}
