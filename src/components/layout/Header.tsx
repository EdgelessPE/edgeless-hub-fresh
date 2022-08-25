import {Button, Input, Layout, PageHeader} from '@arco-design/web-react';
import React, {useEffect, useState} from 'react';
import {IconArrowLeft, IconSearch, IconSettings} from '@arco-design/web-react/icon';
import {BrowserHistory} from 'history';
import {DownloadPopoverCard} from '@/components/layout/DownloadPopoverCard';
import {renderHeaderCategory} from '@/render/headerCategory';
import {iconTitleMapSider} from '@/constants';

interface Prop {
  history: BrowserHistory;
}

const ArcoHeader = Layout.Header;

function renderHeader(setTitle: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>) {
  const s = decodeURI(window.location.pathname)
    .split('/')
    .filter(key => key != '');
  // 渲染
  if (s[0] == 'plugin') {
    if (s[1] == 'category') setTitle(renderHeaderCategory(s[2]));
    else if (s[1] == 'detail') setTitle("插件详情");
  } else {
    //尝试匹配为侧边栏标题
    iconTitleMapSider["settings"] = {
      title: "设置",
      icon: <IconSettings/>
    }
    const m = iconTitleMapSider[s.join('/')];
    if (m != null) {
      setTitle((
        <PageHeader
          title={(
            <div className='flex-container--center'>
              {
                m.icon && <span
                  className='header__title__icon'
                >
                {m.icon}
              </span>
              }
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
  const [displayBack, setDisplayBack] = useState(false);

  const toggleInput = () => setShowSearch(prev => !prev);
  const onInput = (v: string) => setSearchText(v);
  const onSearch = () => {
    console.log(searchText);
    setSearchText('');
    setShowSearch(false);
  };

  useEffect(() => {
    //路由发生变化时配置Header
    history.listen(() => {
      setDisplayBack(true);
      renderHeader(setTitle);
    });
    //首屏渲染一次
    renderHeader(setTitle);
  }, []);

  return (
    <ArcoHeader className='header'>
      <div
        style={{ display: title == null ? 'none' : 'flex' }}
        className='header__title'
      >
        <Button type='text' onClick={history.back} disabled={!displayBack}
                style={{ cursor: displayBack ? 'pointer' : 'auto' }}>
          <IconArrowLeft className='header__title__back-button' style={{ color: displayBack ? '#108ee9' : 'gray' }} />
        </Button>
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
        <Button type='text' onClick={toggleInput}>
          <IconSearch
            className='header__button'
          />
        </Button>
      }
      <DownloadPopoverCard/>
    </ArcoHeader>
  );
};
