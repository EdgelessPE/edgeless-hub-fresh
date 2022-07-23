import { Menu } from '@arco-design/web-react';
import {
  IconApps,
  IconArrowUp,
  IconExperiment,
  IconHome,
  IconList,
  IconMobile,
  IconSettings,
  IconThunderbolt,
  IconTool
} from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import type { History } from 'history';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface Prop {
  history: History;
}

function getCurrentOpenStatus() {
  let s = window.location.pathname.split('/');
  s = s.filter(key => key != '');
  if (s.length == 2) {
    return {
      sub: [s[0]],
      keys: [s[0] + '/' + s[1]]
    };
  } else if (s.length == 1) {
    return {
      sub: [],
      keys: s
    };
  } else {
    return {
      sub: [],
      keys: ['home']
    };
  }
}

export const SiderMenu = ({ history }: Prop) => {
  const initStatus = getCurrentOpenStatus();
  const [selectedKeys, setSelectedKeys] = useState(initStatus.keys);
  const [openKeys, setOpenKeys] = useState(initStatus.sub);

  //监听路由变化以更新侧边栏状态
  history.listen(() => {
    const status = getCurrentOpenStatus();
    setSelectedKeys(status.keys);
    setOpenKeys(status.sub);
  });

  return (
    <Menu
      style={{ width: '100%' }}
      selectedKeys={selectedKeys}
      onClickMenuItem={(key) => {
        setSelectedKeys([key]);
        if (key == 'home') key = '';
        history.push('/' + key);
      }
      }
      openKeys={openKeys}
      onClickSubMenu={(_, openKeys) => {
        setOpenKeys(openKeys);
      }
      }
    >
      <MenuItem key='home'>
        <IconHome />
        首页
      </MenuItem>
      <SubMenu
        key='produce'
        title={
          <span className='sider-title'>
            <IconMobile style={{ marginRight: '12px' }} /> 制作
          </span>
        }>
        <MenuItem key='produce/burn'>
          <IconThunderbolt />
          写入
        </MenuItem>
        <MenuItem key='produce/update'>
          <IconArrowUp />
          升级
        </MenuItem>
        <MenuItem key='produce/alpha'>
          <IconExperiment />
          内测
        </MenuItem>
      </SubMenu>
      <SubMenu
        key='plugin'
        title={
          <span>
            <IconApps style={{ marginRight: '12px' }} /> 插件
          </span>
        }>
        <MenuItem key='plugin/category'>
          分类
        </MenuItem>
        <MenuItem key='plugin/detail'>
          详情
        </MenuItem>
      </SubMenu>
      <MenuItem key='config'>
        <IconTool />
        配置
      </MenuItem>
      <MenuItem key='tasks'>
        <IconList />
        任务
      </MenuItem>
      <MenuItem key='settings'>
        <IconSettings />
        设置
      </MenuItem>
    </Menu>
  );
};
