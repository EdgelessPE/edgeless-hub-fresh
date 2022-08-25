import {Avatar, Button, List, Radio} from "@arco-design/web-react";
import "./index.scss"
import {DeliveredProcedureOutlined, SkinOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {getCurrentTheme, setCurrentTheme} from "@/components/layout/Theme";

interface SettingItem {
  avatar: React.ReactElement,
  title: string,
  description: string,
  actions: React.ReactElement[]
}

function renderSettingItems(items: SettingItem[]): React.ReactElement[] {
  let result: React.ReactElement[] = []
  for (let item of items) {
    result.push((
      <List.Item key={item.title} actions={item.actions}>
        <List.Item.Meta
          avatar={
            <Avatar className="settings__avatar">
              {item.avatar}
            </Avatar>
          }
          title={item.title}
          description={item.description}
          className="settings__meta"
        />
      </List.Item>
    ))
  }

  return result
}

export const Settings = () => {
  const [theme, setTheme] = useState(getCurrentTheme)
  const toggleTheme = (val: boolean) => {
    if (val) {
      document.body.removeAttribute('arco-theme')
    } else {
      document.body.setAttribute('arco-theme', 'dark')
    }
    setCurrentTheme(val)
    setTheme(val)
  }

  const settingItems: SettingItem[] = [
    {
      avatar: <SkinOutlined/>,
      title: "主题",
      description: "切换白昼模式与夜间模式",
      actions: [
        <Radio.Group type="button" value={theme} onChange={toggleTheme}>
          <Radio value={true}>白昼</Radio>
          <Radio value={false}>夜间</Radio>
        </Radio.Group>
      ]
    },
    {
      avatar: <DeliveredProcedureOutlined/>,
      title: "缓存目录（114 MB）",
      description: "D:\\Download\\HubCache",
      actions: [
        <Button>查看</Button>
      ]
    }
  ]

  return (
    <div className="settings__container">
      <List wrapperStyle={{width: "100%"}}>
        {renderSettingItems(settingItems)}
      </List>
    </div>
  );
};