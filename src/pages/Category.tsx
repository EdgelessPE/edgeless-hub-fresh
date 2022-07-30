import { Button } from '@arco-design/web-react';
import { myHistory } from '@/router/history';

export const Category = () => {
  return (
    <>
      <Button
        onClick={() => myHistory.push('/plugin/detail/安全急救/1919810')}
      >查看</Button>
    </>
  );
};
