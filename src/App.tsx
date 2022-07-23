import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { SiderMenu } from '@/components/SiderMenu';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
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
        onCollapse={handleCollapsed}
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
        <SiderMenu />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 20 }}>Header</Header>
        <Layout style={{ padding: '0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
