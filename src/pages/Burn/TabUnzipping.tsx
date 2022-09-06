import {IconArchive} from "@arco-design/web-react/icon";
import {TabProps} from "@/pages/Burn/class";
import {Spin} from "@arco-design/web-react";

export const TabUnzipping = ({next}: TabProps) => {
  return (
    <div className="burn__tab-inner__container">
      <IconArchive className="burn__tab-inner__icon"/>
      <div>
        <h1>正在生成 Edgeless 依赖文件</h1>
        <p>处理进度：1 / 3</p>
      </div>
      <Spin size={40}/>
    </div>
  )
}
