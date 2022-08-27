import {Empty} from "@arco-design/web-react";
import {UsbOutlined} from "@ant-design/icons";

export const EmptyInsertUDisk = () => {
  return (
    <Empty icon={
      <div className="empty-icon">
        <UsbOutlined/>
      </div>
    } description={
      <h2>请插入 Edgeless 启动盘</h2>
    }/>
  )
}
