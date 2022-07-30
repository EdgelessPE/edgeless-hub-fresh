import { Input, Layout, PageHeader, Popover } from '@arco-design/web-react';
import React, { useState } from 'react';
import { IconArrowLeft, IconDownload, IconSearch } from '@arco-design/web-react/icon';
import { BrowserHistory } from 'history';
import { DownloadPopoverCard, DownloadTitle } from '@/components/DownloadPopoverCard';
import { renderHeaderCategory } from '@/render/headerCategory';
import { iconTitleMapSider } from '@/constants';

interface Prop {
  history: BrowserHistory;
}

const ArcoHeader = Layout.Header;

const IconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  flex: '40px 0 0',
  color: '#108ee9',
  cursor: 'pointer'
};

function renderHeader(setTitle: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>) {
  const s = window.location.pathname
    .split('/')
    .filter(key => key != '');
  // 渲染
  if (s[0] == 'plugin' && s[1] == 'category') {
    setTitle(renderHeaderCategory(decodeURI(s[2])));
  } else {
    //尝试匹配为侧边栏标题
    const m = iconTitleMapSider[s.join('/')];
    if (m != null) {
      setTitle((
        <PageHeader
          title={(
            <div>
              <span style={{ marginRight: '6px' }}>
                {m.icon}
              </span>
              {m.title}
            </div>
          )}
        />
      ));
    } else {
      setTitle(null);
    }
  }
}


export const Header = ({ history }: Prop) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState<JSX.Element | string | null>(null);

  const ToTasks = () => history.push('/tasks');
  const toggleInput = () => setShowSearch(prev => !prev);
  const onInput = (v: string) => setSearchText(v);
  const onSearch = () => {
    console.log(searchText);
    setSearchText('');
    setShowSearch(false);
  };

  //路由发生变化时配置Header
  history.listen(() => {
    renderHeader(setTitle);
  });

  return (
    <ArcoHeader style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 20px'
    }}>
      <div style={{
        flex: '600px 0 0',
        display: title == null ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 'auto',
        fontSize: '18px',
        color: '#0f2942',
        fontWeight: 'bold'
      }}>
        <IconArrowLeft style={{
          width: '20px',
          height: '20px',
          color: '#108ee9',
          flex: '40px 0 0',
          cursor: 'pointer'
        }} onClick={history.back}
        />
        {title}
      </div>

      {showSearch ?
        <Input.Search
          value={searchText}
          allowClear
          placeholder='搜索插件'
          onBlur={toggleInput}
          onChange={onInput}
          onSearch={onSearch}
        ></Input.Search>
        :
        <IconSearch
          style={IconStyle}
          onClick={toggleInput}
        />
      }

      <Popover title={DownloadTitle} content={DownloadPopoverCard()}>
        <IconDownload
          style={IconStyle}
          onClick={ToTasks}
        />
      </Popover>
    </ArcoHeader>
  );
};
