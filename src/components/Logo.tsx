import React, { useState } from 'react';

// import edgeless from '../../public/favicon.png'

interface Prop {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Logo = ({ collapsed, setCollapsed }: Prop) => {
  const [displayText, setDisplayText] = useState(true);
  const handleClick = () => {
    if (collapsed) {
      setTimeout(() => setDisplayText(prev => !prev), 150);
    } else {
      setDisplayText(prev => !prev);
    }
    setCollapsed(prev => !prev);
  };
  return (
    <div className='logo' onClick={handleClick}>
      <img alt='E' src={'https://home.edgeless.top/favicon.ico'} style={{
        width: '32px',
        height: '32px',
        marginLeft: collapsed ? '0' : '12px'
      }} />
      <span style={{
        display: displayText ? 'inline-block' : 'none'
      }}>Edgeless Hub</span>
    </div>
  );
};
