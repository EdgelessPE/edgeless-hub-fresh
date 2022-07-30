import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import { Routes } from 'react-router-dom';
import '@arco-design/web-react/dist/css/arco.css';

import { getRouterNodes } from '@/router/routers';
import { myHistory } from '@/router/history';

import { SiderMenu } from '@/components/SiderMenu';
import { HistoryRouter } from '@/router/HistoryRouter';
import { Logo } from '@/components/Logo';
import { Header } from '@/components/Header';

const Sider = Layout.Sider;
const Content = Layout.Content;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='app'>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        breakpoint='xl'
      >
        <Logo collapsed={collapsed} setCollapsed={setCollapsed} />
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
