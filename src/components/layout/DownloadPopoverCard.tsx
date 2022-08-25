import React from 'react';
import bridge from '@/bridge';
import {Button, Popover} from "@arco-design/web-react";
import {IconDownload} from "@arco-design/web-react/icon";

async function hello() {
  const rep = await bridge('hello');
  console.log(rep);
}

const PopoverCtx = () => {
  return (
    <button onClick={hello}>114514</button>
  );
};

const DownloadTitle = '无下载任务';

export const DownloadPopoverCard = () => {
  return (
    <Popover title={DownloadTitle} content={<PopoverCtx/>}>
      <Button type='text'>
        <IconDownload
          className='header__button'
        />
      </Button>
    </Popover>
  )
}
