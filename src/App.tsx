import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import { Routes } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import '@arco-design/web-react/dist/css/arco.css';

import { routers } from '@/router/router';
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
        <Header title={
          <>
            <SafetyCertificateOutlined />
            安全急救
          </>
        } history={myHistory} />
        <Content style={{ margin: '24px' }}>
          <HistoryRouter history={myHistory}>
            <Routes>
              {routers}
            </Routes>
          </HistoryRouter>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
