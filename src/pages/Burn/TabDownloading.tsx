import {IconCloudDownload} from "@arco-design/web-react/icon";
import {Space} from "@arco-design/web-react";
import {TabProps} from "@/pages/Burn/class";
import {useState} from "react";
import {NaiveProgressBar, NaiveProgressBarTask} from "@/components/molecules/NaiveProgressBar";

export const TabDownloading = ({next}: TabProps) => {
  const emptyTask: NaiveProgressBarTask = {
    percent: 0,
    totalSize: 0,
    fileName: "等待中..."
  }
  const [taskImage, setTaskImage] = useState({
      percent: 14,
      totalSize: 809 * 1024 * 1024,
      fileName: "Edgeless_Beta_4.1.0.iso"
    }),
    [taskVentoy, setTaskVentoy] = useState({
      percent: 45,
      totalSize: 15597 * 1024,
      fileName: "ventoy-1.0.79-windows.zip"
    }),
    [taskVentoyPlugin, setTaskVentoyPlugin] = useState({
      percent: 90,
      totalSize: 2868 * 1024,
      fileName: "ventoy_wimboot.img"
    });

  return (
    <div className="burn__tab-inner__container">
      <IconCloudDownload className="burn__tab-inner__icon"/>
      <div>
        <h1>我们需要下载一些必要的依赖文件</h1>
        <p>请保持网络连接稳定且可靠</p>
      </div>
      <Space direction="vertical" style={{width: "80%"}}>
        <NaiveProgressBar info={taskImage}/>
        <NaiveProgressBar info={taskVentoy}/>
        <NaiveProgressBar info={taskVentoyPlugin}/>
      </Space>
    </div>
  )
}
