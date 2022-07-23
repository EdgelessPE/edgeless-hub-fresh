import React from 'react';

// import edgeless from '../../public/favicon.png'

interface Prop {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Logo = ({ collapsed, setCollapsed }: Prop) => {
  const handleClick = () => {
    setCollapsed(prev => !prev);
  };
  return (
    <div className='logo' onClick={handleClick}>
      <img alt='E' src={'https://home.edgeless.top/favicon.ico'} style={{
        width: '32px',
        height: '32px',
        marginLeft: collapsed ? '0' : '12px'
      }} />
      <span style={{ display: collapsed ? 'none' : 'inline-block' }}>Edgeless Hub</span>
    </div>
  );
};
