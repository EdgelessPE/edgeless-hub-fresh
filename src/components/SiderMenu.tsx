import { Menu } from '@arco-design/web-react';
import { IconCalendar, IconHome } from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import { useHref } from 'react-router-dom';
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
  return (
    <Menu
      onClickMenuItem={(key) => {
        if (key == 'home') key = '';
        history.push('/' + key);
        setSelectedKeys([key]);
      }
      }
      style={{ width: '100%' }}
      selectedKeys={selectedKeys}
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
      <SubMenu key='produce' title='制作'>
        <MenuItem key='produce/burn'>写入</MenuItem>
        <MenuItem key='produce/update'>升级</MenuItem>
        <MenuItem key='produce/alpha'>内测</MenuItem>
      </SubMenu>
      <MenuItem key='config'>
        <IconCalendar />
        配置
      </MenuItem>
      <SubMenu key='plugin' title='插件'>
        <MenuItem key='plugin/category'>分类</MenuItem>
        <MenuItem key='plugin/detail'>详情</MenuItem>
      </SubMenu>
      <MenuItem key='tasks'>
        <IconCalendar />
        任务
      </MenuItem>
      <MenuItem key='settings'>
        <IconCalendar />
        设置
      </MenuItem>
    </Menu>
  );
};
