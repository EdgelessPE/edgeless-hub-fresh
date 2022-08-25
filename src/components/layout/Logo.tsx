import React from 'react';

// import edgeless from '../../public/favicon.png'

interface Prop {
  displayText: boolean;
  onClick:()=>void
}

export const Logo = ({ displayText,onClick}: Prop) => {
  return (
    <div className='logo' onClick={onClick}>
      <img alt='E' src={'https://home.edgeless.top/favicon.ico'} style={{
        width: '32px',
        height: '32px',
        marginLeft: displayText ? '12px' : '0'
      }} />
      <span style={{
        display: displayText ? 'inline-block' : 'none'
      }}>Edgeless Hub</span>
    </div>
  );
};
