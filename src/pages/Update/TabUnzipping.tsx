import {IconArchive} from "@arco-design/web-react/icon";
import {Button, Spin} from "@arco-design/web-react";
import {UpdateTabProps} from "./class";

export const TabUnzipping = ({next, sharedState}: UpdateTabProps) => {
  return (
    <div className="burn__tab-inner__container">
      <IconArchive className="burn__tab-inner__icon"/>
      <div>
        <h1>正在生成 Edgeless 依赖文件</h1>
        <p>处理进度：1 / 2</p>
      </div>
      <Spin size={40}/>
      <Button onClick={() => next()}>next</Button>
    </div>
  )
}
