import {FireOutlined} from "@ant-design/icons";
import {UpdateKernel, UpdateTabProps, UpdateVentoy} from "@/pages/Update/class";
import {Button} from "@arco-design/web-react";

export const TabStart = ({next, sharedState}: UpdateTabProps) => {
  const updateKernel: UpdateKernel | null = sharedState.get("update_kernel"),
    updateVentoy: UpdateVentoy | null = sharedState.get("update_ventoy")
  return (
    <div className="burn__tab-inner__container">
      <FireOutlined className="burn__tab-inner__icon"/>
      <div>
        <h1>有可用的更新</h1>
        <p>{updateKernel?.online ? `Edgeless 内核：${updateKernel.local.name} -> ${updateKernel.online.name}` : ""}</p>
        <p>{updateVentoy?.online ? `Ventoy：${updateVentoy.local.version} -> ${updateVentoy.online.name}` : ""}</p>
      </div>
      <Button type="primary" onClick={() => next()}>立即更新</Button>
    </div>
  )
}
