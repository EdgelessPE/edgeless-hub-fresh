import {Empty} from "@arco-design/web-react";
import {UsbOutlined} from "@ant-design/icons";
import React from "react";

export const EmptyInsertUDisk = () => {
  return (
    <Empty
      icon={
        <div className="empty__icon">
          <UsbOutlined />
        </div>
      }
      description={<b className="empty__tip">插入 Edgeless 启动盘以继续</b>}
    />
  );
};
