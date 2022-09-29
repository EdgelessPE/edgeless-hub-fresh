import React, { useEffect, useState } from "react";
import { Button, Layout } from "@arco-design/web-react";
import { Routes } from "react-router-dom";
import "@arco-design/web-react/dist/css/arco.css";
import { setCurrentTheme } from "@/services/theme";
import { getRouterNodes } from "@/router/routers";
import { myHistory } from "@/router/history";

import { SiderMenu } from "@/components/layout/SiderMenu";
import { HistoryRouter } from "@/router/HistoryRouter";
import { Logo } from "@/components/layout/Logo";
import { Header } from "@/components/layout/Header";
import { IconSettings } from "@arco-design/web-react/icon";
import { BrowserHistory } from "history";
import init from "@/init";
import useModal from "@arco-design/web-react/es/Modal/useModal";
import { getRouterPath } from "@/router/utils";

const Sider = Layout.Sider;
const Content = Layout.Content;

function useSettingButton(showText: boolean, history: BrowserHistory) {
  const [selected, setSelected] = useState(false);
  const getSelected = () => {
    const s = getRouterPath();
    if (s.length == 1 && s[0] == "settings") {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };
  useEffect(() => {
    getSelected();
    history.listen(getSelected);
  }, []);
  const gotoSetting = () => {
    history.push("/settings");
  };
  return (
    <Button
      type="text"
      onClick={gotoSetting}
      style={selected ? undefined : { color: "gray" }}
    >
      <IconSettings />
      {showText && "设置"}
    </Button>
  );
}

// 暗黑模式跟随系统
let media = window.matchMedia('(prefers-color-scheme: dark)');
if (media.matches) {
  document.body.setAttribute("arco-theme", "dark");
  setCurrentTheme(false);
}



const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [displayText, setDisplayText] = useState(true);

  const handleLogoClick = () => {
    if (collapsed) {
      setTimeout(() => setDisplayText((prev) => !prev), 150);
    } else {
      setDisplayText((prev) => !prev);
    }
    setCollapsed((prev) => !prev);
  };

  // 初始化与错误处理弹窗
  const [modal, contextHolder] = useModal();
  useEffect(() => {
    init(modal);
  }, []);

  return (
    <Layout className="app">
      {contextHolder}
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={useSettingButton(displayText, myHistory)}
        breakpoint="xl"
      >
        <Logo displayText={displayText} onClick={handleLogoClick} />
        <SiderMenu history={myHistory} />
      </Sider>
      <Layout className="layout">
        <Header history={myHistory} />
        <Content className="layout__content">
          <HistoryRouter history={myHistory}>
            <Routes>{getRouterNodes()}</Routes>
          </HistoryRouter>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
