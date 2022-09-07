import {DeploymentUnitOutlined} from "@ant-design/icons";
import {TabProps} from "@/pages/Burn/class";
import {Progress} from "@arco-design/web-react";
import {colorfulProgressBar} from "@/constants";
import {useState} from "react";
import {formatSize} from "@/utils";

export const TabWriting = ({next}: TabProps) => {
  const [copyStatus, setCopyStatus] = useState({
    totalSize: 809 * 1024 * 1024,
    writtenSize: 700 * 1024 * 1024,
  })
  return (
    <div className="burn__tab-inner__container">
      <DeploymentUnitOutlined className="burn__tab-inner__icon"/>
      <div>
        <h1>正在向 E 盘部署 Edgeless 依赖文件</h1>
        <p>稍安勿躁，你的启动盘很快就好</p>
      </div>
      <Progress
        percent={100 * copyStatus.writtenSize / copyStatus.totalSize}
        animation
        color={colorfulProgressBar.red}
        width="80%"
        formatText={percent => {
          return `${formatSize(copyStatus.writtenSize)} / ${formatSize(copyStatus.totalSize)} - ${percent.toFixed(2)}%`
        }}
      />
    </div>
  )
}
