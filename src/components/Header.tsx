import { Input, Layout, Popover } from '@arco-design/web-react';
import React, { useState } from 'react';
import { IconArrowLeft, IconDownload, IconSearch } from '@arco-design/web-react/icon';
import { BrowserHistory } from 'history';
import { DownloadPopoverCard, DownloadTitle } from '@/components/DownloadPopoverCard';

interface Prop {
  history: BrowserHistory;
  title?: React.ReactElement | string;
}

const ArcoHeader = Layout.Header;

const IconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  flex: '40px 0 0',
  color: '#108ee9',
  cursor: 'pointer'
};


export const Header = ({ history, title }: Prop) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const ToTasks = () => history.push('/tasks');
  const toggleInput = () => setShowSearch(prev => !prev);
  const onInput = (v: string) => setSearchText(v);
  const onSearch = () => {
    console.log(searchText);
    setSearchText('');
    setShowSearch(false);
  };

  return (
    <ArcoHeader style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 20px'
    }}>
      <div style={{
        flex: '600px 0 0',
        display: 'flex',
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
