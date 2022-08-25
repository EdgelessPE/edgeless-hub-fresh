import {
  IconApps,
  IconArrowUp,
  IconEdit,
  IconExperiment,
  IconFire,
  IconHome,
  IconList,
  IconThunderbolt
} from '@arco-design/web-react/icon';
import React from 'react';
import {SiderNode} from '@/components/layout/SiderMenu';
import {
  ApiOutlined,
  BookOutlined,
  BugOutlined,
  BuildOutlined,
  CameraOutlined,
  ChromeOutlined,
  CodeOutlined,
  ControlOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  FileZipOutlined,
  FolderOpenOutlined,
  GiftOutlined,
  GlobalOutlined,
  HourglassOutlined,
  ItalicOutlined,
  SafetyCertificateOutlined,
  SaveOutlined,
  SkinOutlined,
  ToolOutlined,
  TrophyOutlined,
  WechatOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';

const siderNodes: SiderNode[] = [
  {
    path: 'home',
    title: '首页',
    icon: <IconHome />
  },
  {
    path: 'produce',
    title: '制作',
    icon: <IconThunderbolt />,
    children: [
      {
        path: 'produce/burn',
        title: '写入',
        icon: <IconFire />
      },
      {
        path: 'produce/update',
        title: '升级',
        icon: <IconArrowUp />
      },
      {
        path: 'produce/alpha',
        title: '内测',
        icon: <IconExperiment />
      }
    ]
  },
  {
    path: 'plugin',
    title: '插件',
    icon: <IconApps />,
    children: [
      {
        path: 'plugin/category/浏览器',
        title: '浏览器',
        icon: <ChromeOutlined />
      },
      {
        path: 'plugin/category/安全急救',
        title: '安全急救',
        icon: <SafetyCertificateOutlined />
      },
      {
        path: 'plugin/detail/实用工具/Smap_0.1.11.0_undefined（bot）.7z',
        title: '详情'
      }
    ]
  },
  {
    path: 'config',
    title: '配置',
    icon: <IconEdit />
  },
  {
    path: 'tasks',
    title: '任务',
    icon: <IconList />
  },
];

const iconMapCategory: Record<string, JSX.Element> = {
  '精选插件': <TrophyOutlined/>,
  '实用工具': <ToolOutlined/>,
  '开发辅助': <BugOutlined/>,
  '配置检测': <DashboardOutlined/>,
  '资源管理': <FolderOpenOutlined/>,
  '办公编辑': <BookOutlined/>,
  '输入法': <ItalicOutlined/>,
  '集成开发': <CodeOutlined/>,
  '录屏看图': <CameraOutlined/>,
  '磁盘数据': <SaveOutlined/>,
  '安全急救': <SafetyCertificateOutlined />,
  '网课会议': <WhatsAppOutlined />,
  '即时通讯': <WechatOutlined />,
  '安装备份': <HourglassOutlined />,
  '游戏娱乐': <GiftOutlined />,
  '运行环境': <BuildOutlined />,
  '压缩镜像': <FileZipOutlined />,
  '美化增强': <SkinOutlined />,
  '驱动管理': <ControlOutlined />,
  '下载上传': <GlobalOutlined />,
  '浏览器': <ChromeOutlined />,
  '影音播放': <CustomerServiceOutlined />,
  '远程连接': <ApiOutlined />
};

function getTitleMapSider(nodes: SiderNode[]): Record<string, {
  title: string,
  icon?: JSX.Element,
}> {
  let map: Record<string, {
    title: string,
    icon?: JSX.Element,
  }> = {};
  for (let node of nodes) {
    map[node.path == 'home' ? '' : node.path] = {
      icon: node.icon,
      title: node.title
    };
    if (node.children != undefined) {
      map = {
        ...map,
        ...getTitleMapSider(node.children)
      };
    }
  }

  return map;
}

const iconTitleMapSider = getTitleMapSider(siderNodes);

export {
  siderNodes,
  iconMapCategory,
  iconTitleMapSider
};
