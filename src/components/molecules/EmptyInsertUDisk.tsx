import {Empty} from "@arco-design/web-react";
import {UsbOutlined} from "@ant-design/icons";

export const EmptyInsertUDisk = () => {
  return (
    <Empty icon={
      <div className="empty__icon">
        <UsbOutlined/>
      </div>
    } description={
      <p className="empty__tip">插入 Edgeless 启动盘以继续</p>
    }/>
  )
}
