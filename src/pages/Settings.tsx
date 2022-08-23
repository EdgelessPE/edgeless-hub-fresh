import {Avatar, List, Radio} from "@arco-design/web-react";
import "styles/settings.scss"
import {SkinOutlined} from "@ant-design/icons";
import {useState} from "react";
import {getCurrentTheme, setCurrentTheme} from "@/components/Theme";

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

  return (
    <div className="settings__container">
      <List wrapperStyle={{width: "100%"}}>
        <List.Item key={1} actions={[
          <Radio.Group type="button" value={theme} onChange={toggleTheme}>
            <Radio value={true}>白昼</Radio>
            <Radio value={false}>夜间</Radio>
          </Radio.Group>
        ]}>
          <List.Item.Meta
            avatar={
              <Avatar className="settings__avatar">
                <SkinOutlined/>
              </Avatar>
            }
            title="主题"
            description="切换白昼模式与夜间模式"
            className="settings__meta"
          />
        </List.Item>
      </List>
    </div>
  );
};
