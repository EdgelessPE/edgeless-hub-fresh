import React from 'react';
import bridge from '@/bridge';

async function hello() {
  const rep = await bridge('hello');
  console.log(rep);
}

const DownloadPopoverCard = () => {
  return (
    <button onClick={hello}>114514</button>
  );
};

const DownloadTitle = '无下载任务';

export {
  DownloadPopoverCard,
  DownloadTitle
};
