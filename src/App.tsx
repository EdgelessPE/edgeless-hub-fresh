import React, {useEffect, useState} from 'react';
import {Button, Layout} from '@arco-design/web-react';
import { Routes } from 'react-router-dom';
import '@arco-design/web-react/dist/css/arco.css';

import { getRouterNodes } from '@/router/routers';
import { myHistory } from '@/router/history';

import { SiderMenu } from '@/components/SiderMenu';
import { HistoryRouter } from '@/router/HistoryRouter';
import { Logo } from '@/components/Logo';
import { Header } from '@/components/Header';
import {IconSettings} from "@arco-design/web-react/icon";
import {BrowserHistory} from "history";

const Sider = Layout.Sider;
const Content = Layout.Content;

function useSettingButton(showText:boolean,history:BrowserHistory) {
  const [selected,setSelected]=useState(false)
  const getSelected=()=>{
    let s = decodeURI(window.location.pathname)
      .split('/')
      .filter(key => key != '');
    if(s.length==1&&s[0]=="settings"){
      setSelected(true)
    }else{
      setSelected(false)
    }
  }
  useEffect(()=>{
    getSelected()
    history.listen(getSelected)
  },[])
  const gotoSetting=()=>{
    history.push("/settings")
  }
  return (
    <Button type="text" onClick={gotoSetting} style={selected?undefined:{color:"gray"}}>
      <IconSettings />
      {showText&&"设置"}
    </Button>
  )
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [displayText, setDisplayText] = useState(true);

  return (
    <Layout className='app'>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={useSettingButton(displayText,myHistory)}
        breakpoint='xl'
      >
        <Logo collapsed={collapsed} setCollapsed={setCollapsed} displayText={displayText} setDisplayText={setDisplayText} />
        <SiderMenu history={myHistory} />
      </Sider>
      <Layout>
        <Header history={myHistory} />
        <Content style={{ margin: '24px' }}>
          <HistoryRouter history={myHistory}>
            <Routes>
              {getRouterNodes()}
            </Routes>
          </HistoryRouter>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
