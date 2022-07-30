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
            <div className='flex-container--center'>
              <span className='header__title__icon'>
                {m.icon}
              </span>
              <span className='header__title__text'>
                {m.title}
              </span>

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
    <ArcoHeader className='header'>
      <div
        style={{ display: title == null ? 'none' : 'flex' }}
        className='header__title'
      >
        <IconArrowLeft className='header__title__back-button' onClick={history.back} />
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
          className='header__searchbar'
        ></Input.Search>
        :
        <IconSearch
          className='header__button'
          onClick={toggleInput}
        />
      }

      <Popover title={DownloadTitle} content={DownloadPopoverCard()}>
        <IconDownload
          className='header__button'
          onClick={ToTasks}
        />
      </Popover>
    </ArcoHeader>
  );
};
