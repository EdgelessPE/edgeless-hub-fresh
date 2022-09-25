import {
  Button,
  Empty,
  Input,
  List,
  Select,
  Switch,
  Tooltip,
} from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import preferenceItems from "./preferenceItems.json";
import resolutions from "./resolutions.json";
import "./index.scss";
import { IconEyeInvisible, IconInfoCircle } from "@arco-design/web-react/icon";
import bridge from "@/bridge/method";
import { Result } from "ts-results";

interface ConfigItem {
  title: string;
  description: string;
  actions: React.ReactElement[];
}

interface PreferenceItem {
  title: string;
  description: string;
  information: string;
  higherThan: string;
  lowerThan?: string;
  folderName: string;
}

function renderConfigItems(items: ConfigItem[]): React.ReactElement[] {
  let result: React.ReactElement[] = [];
  for (let item of items) {
    result.push(
      <List.Item key={item.title} actions={item.actions}>
        <List.Item.Meta
          title={item.title}
          description={item.description}
          className="config__meta"
        />
      </List.Item>
    );
  }

  return result;
}

function renderPreferenceItems(): React.ReactElement[] {
  let result: React.ReactElement[] = [];
  for (let item of preferenceItems) {
    let actions = item.information
      ? [
          <Tooltip content={item.information}>
            <IconInfoCircle />
          </Tooltip>,
        ]
      : [];
    actions.push(<Switch key={item.title} />);
    result.push(
      <List.Item key={item.title} actions={actions}>
        <List.Item.Meta
          title={item.title}
          description={item.description}
          className="config__meta"
        />
      </List.Item>
    );
  }

  return result;
}

function renderResolutionOptions(): React.ReactElement[] {
  let result: React.ReactElement[] = [];
  for (let item of resolutions) {
    const val = `${item.width}_${item.height}`;
    result.push(
      <Select.Option key={val} value={val}>
        {`${item.width} x ${item.height}`}
      </Select.Option>
    );
  }

  return result;
}

export const Config = () => {
  const [resolution, setResolution] = useState("auto");
  const [wallpaperPreview, setWallpaperPreview] = useState(
    <Empty description="无法预览壁纸" icon={<IconEyeInvisible />} />
  );
  const configItems: ConfigItem[] = [
    {
      title: "浏览器首页",
      description: "支持通过插件包加载的主流浏览器",
      actions: [
        <Input style={{ width: "240px" }} value="https://www.baidu.com" />,
      ],
    },
    {
      title: "Legacy启动分辨率",
      description:
        "仅对Legacy引导启动生效，UEFI引导启动时请在启动菜单选择分辨率",
      actions: [
        <Select
          style={{ width: "132px" }}
          value={resolution}
          onChange={setResolution}
        >
          <Select.Option value="auto">自动调节</Select.Option>
          <Select.Option value="none">不调节</Select.Option>
          {renderResolutionOptions()}
        </Select>,
      ],
    },
  ];

  //获取当前壁纸url
  useEffect(() => {
    bridge("getLocalImageSrc", "D:\\360Downloads\\2056038.jpg").then(
      (wallPaperUrlRes: Result<string, string>) => {
        if (wallPaperUrlRes.ok)
          setWallpaperPreview(
            <img
              src={wallPaperUrlRes.val}
              alt="wallpaper"
              className="config__wallpaper-preview"
            />
          );
      }
    );
  }, []);

  return (
    <div className="config__container">
      <List wrapperClassName="config__list-wrapper">
        <List.Item
          key="wallpaper"
          actions={[<Button key="change">更换</Button>]}
        >
          <List.Item.Meta
            title="壁纸"
            description="自定义桌面壁纸"
            className="config__meta"
          />
          {wallpaperPreview}
        </List.Item>

        {renderConfigItems(configItems)}
        {renderPreferenceItems()}
      </List>
    </div>
  );
};
