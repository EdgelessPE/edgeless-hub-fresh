import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';
import { SiderMenu } from '@/components/SiderMenu';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { routers } from '@/router/router';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { HistoryRouter } from '@/router/HistoryRouter';
import { myHistory } from '@/router/history';

const Sider = Layout.Sider;
const Content = Layout.Content;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <Layout className='app'>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        breakpoint='xl'
      >
        <div className='logo' onClick={handleCollapsed}>
          <img alt='E' src='/favicon.ico' style={{
            width: '32px',
            height: '32px',
            marginLeft: collapsed ? '0' : '15px'
          }} />
          <span style={{ display: collapsed ? 'none' : 'inline-block' }}>Edgeless</span>
        </div>
        <SiderMenu history={myHistory} />
      </Sider>
      <Content style={{ margin: '24px' }}>
        <HistoryRouter history={myHistory}>
          <Routes>
            {routers}
          </Routes>
        </HistoryRouter>
      </Content>
    </Layout>
  )
}

export default App
