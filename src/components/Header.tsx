import { Layout } from '@arco-design/web-react';
import React from 'react';
import { IconArrowLeft, IconDownload, IconSearch } from '@arco-design/web-react/icon';
import { BrowserHistory } from 'history';

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
      <IconSearch
        style={IconStyle}
        onClick={() => console.log(history.location)}
      />
      <IconDownload style={IconStyle} />
    </ArcoHeader>
  );
};
