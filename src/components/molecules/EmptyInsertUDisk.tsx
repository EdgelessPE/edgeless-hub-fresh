import {Empty} from "@arco-design/web-react";
import {UsbOutlined} from "@ant-design/icons";

export const EmptyInsertUDisk = () => {
  return (
    <Empty icon={
      <div className="empty-icon">
        <UsbOutlined/>
      </div>
    } description={
      <h2>插入 Edgeless 启动盘以继续</h2>
    }/>
  )
}
