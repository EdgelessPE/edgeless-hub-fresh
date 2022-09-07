import {IconCloseCircle} from "@arco-design/web-react/icon";
import {sharedState} from "@/pages/Burn/sharedState";
import {Button, Space} from "@arco-design/web-react";
import {TabProps} from "@/pages/Burn/class";
import {reportIssue} from "@/pages/Burn/utils";

export const TabThrown = ({next}: TabProps) => {
  sharedState.set("thrownMessage", "你的启动盘被田所浩二撅力！（悲）\n你是一个一个一个，哼哼啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿啊啊啊啊")
  const thrownMessage = sharedState.get("thrownMessage") ?? "无错误信息"
  return (
    <div className="burn__tab-inner__container">
      <IconCloseCircle className="burn__tab-inner__icon" style={{color: "rgb(var(--red-6))"}}/>
      <div>
        <h1>写入过程中出现了错误</h1>
        <p>{thrownMessage}</p>
      </div>
      <Space>
        <Button onClick={reportIssue}>反馈问题</Button>
        <Button onClick={() => next("Start")}>重试</Button>
      </Space>
    </div>
  )
}
