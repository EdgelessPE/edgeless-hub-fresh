import { NaiveDescription } from "@/components/molecules/NaiveDescription";
import React from "react";
import { Dropdown, Menu, Tag } from "@arco-design/web-react";
import {
  IconCaretDown,
  IconCaretUp,
  IconMinusCircle,
} from "@arco-design/web-react/icon";
import { isDisabled, isLocalBoost } from "@/pages/Tasks/utils";
import { FileNodePackageLocal } from "types/local";
import { FileNodePackageOnline } from "types/online";
import { parsePackageName } from "@/utils/parser";
import { formatSize } from "@/utils/formatter";

interface Props {
  online: FileNodePackageOnline;
  local: FileNodePackageLocal;
}

export const CardUpdate = ({ local, online }: Props) => {
  const parsedOnline = parsePackageName(online.name).unwrap(),
    parsedLocal = parsePackageName(local.name).unwrap(),
    disabled = isDisabled(local),
    localboost = isLocalBoost(local);

  let sizeBadge: React.ReactElement;
  const sizeChange = online.size - local.size;
  if (sizeChange > 0) {
    sizeBadge = (
      <Tag size="small" icon={<IconCaretUp />} color="red">
        {formatSize(sizeChange).toString()}
      </Tag>
    );
  } else if (sizeChange < 0) {
    sizeBadge = (
      <Tag size="small" icon={<IconCaretDown />} color="green">
        {formatSize(-sizeChange).toString()}
      </Tag>
    );
  } else {
    sizeBadge = (
      <Tag size="small" icon={<IconMinusCircle />}>
        0B
      </Tag>
    );
  }

  let descriptions: Record<string, string | React.ReactElement> = {
    可更新: parsedLocal.version + " -> " + parsedOnline.version,
    占用: (
      <div>
        {formatSize(local.size).toString() +
          " -> " +
          formatSize(online.size).toString()}{" "}
        {sizeBadge}
      </div>
    ),
  };
  if (localboost) {
    descriptions["属性"] = <Tag color="cyan">LocalBoost</Tag>;
  }

  return (
    <div
      className="tasks__card__container"
      style={
        descriptions.hasOwnProperty("属性") ? { height: "120px" } : undefined
      }
    >
      <div className="tasks__card__header">
        <h3 className="tasks__card__header__title">
          <span
            style={
              disabled
                ? {
                    marginRight: "4px",
                    color: "gray",
                    textDecoration: "line-through",
                  }
                : { marginRight: "4px" }
            }
          >
            {parsedLocal.name}
          </span>
        </h3>

        <Dropdown.Button
          type={disabled ? "secondary" : "primary"}
          droplist={
            <Menu>
              <Menu.Item key="10">{disabled ? "启用" : "禁用"}</Menu.Item>
              <Menu.Item key="localboost">
                {localboost ? "取消 LocalBoost 启动" : "应用 LocalBoost 启动"}
              </Menu.Item>
              <Menu.Item key="delete">删除</Menu.Item>
            </Menu>
          }
        >
          更新
        </Dropdown.Button>
      </div>
      <NaiveDescription
        kvMap={descriptions}
        keyWidth="64px"
        rowHeight="24px"
        addColon
        style={{ textAlign: "start" }}
      />
    </div>
  );
};
