import {CloudSyncOutlined} from "@ant-design/icons";
import {Button, Spin} from "@arco-design/web-react";
import {UpdateTabProps} from "./class";
import {KernelLocal, KernelOnline} from "@/class";

export const TabChecking = ({next, sharedState}: UpdateTabProps) => {
  const kernelOnline: KernelOnline = {
    name: "Edgeless_Beta_4.1.0.iso",
    size: 816 * 1024 * 1024,
    timestamp: 0,
    hash: "",
    url: ""
  }, kernelLocal: KernelLocal = {
    name: "Edgeless_Beta_3.2.0.wim",
    size: 816 * 1024 * 1024,
    timestamp: 0,
    path: ""
  }
  return (
    <div className="smt__container">
      <CloudSyncOutlined className="smt__icon"/>
      <h1>正在检查可用更新</h1>
      <Spin size={40}/>
      <Button onClick={() => {
        sharedState.set("update_kernel", {
          online: kernelOnline,
          local: kernelLocal
        })
        next("Empty")
      }}>下一步</Button>
    </div>
  )
}
