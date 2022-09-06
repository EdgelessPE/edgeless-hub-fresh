import './index.scss'
import React, {useState} from "react";
import {Alert, Button, Steps} from "@arco-design/web-react";
import {TabStart} from "@/pages/Burn/TabStart";
import {State, StateInfo, TabProps} from "./class";
import {myHistory} from "@/router/history";
import {TabDownloading} from "@/pages/Burn/TabDownloading";
import {TabUnzipping} from "@/pages/Burn/TabUnzipping";
import {TabWaitingForVentoy} from "@/pages/Burn/TabWaitingForVentoy";
import {log} from "@/utils";
import {TabWaitingForSelect} from "@/pages/Burn/TabWaitingForSelect";

const STATE_FLOW: StateInfo[] = [
  {state: "Start", step: 0},
  {state: "Downloading", step: 1},
  {state: "Unzipping", step: 1},
  {state: "WaitingForVentoy", step: 2},
  {state: "WaitingForSelect", step: 2, branch: true},
  {state: "Writing", step: 3},
  {state: "Verifying", step: 3},
  {state: "Finish", step: 4},
  {state: "Thrown", step: 4, branch: true},
]

function getNextState(current: StateInfo, allowBranch = false): StateInfo {
  for (let i = 0; i < STATE_FLOW.length - 2; i++) {
    const node = STATE_FLOW[i]
    if (!allowBranch && node.branch) continue
    if (node.state == current.state) {
      const nextNode = STATE_FLOW[i + 1]
      if (nextNode.branch) return getNextState(nextNode, true)
      else return nextNode
    }
  }
  console.error(`Fatal:Shouldn't receive state ${current.state}`)
  return {state: "Thrown", step: 4}
}

export const Burn = () => {
  const [currentState, setCurrentState] = useState<StateInfo>({state: "Start", step: 0})

  const next = (state?: State) => {
    if (state != null) {
      for (let node of STATE_FLOW) {
        if (node.state == state) {
          setCurrentState(node)
          log(`Info:Switch to given state ${state}`)
          return
        }
      }
      log(`Error:Fatal:Unknown next state ${state}`)
      setCurrentState({state: "Thrown", step: 4})
      return
    }
    setCurrentState((prev: StateInfo) => {
      const ns = getNextState(prev);
      log(`Info:Switch to next state ${ns.state}`)
      return ns
    })
  }

  const thrown = currentState.state == "Thrown", existEdgeless = false

  const tabProps: TabProps = {
    next
  }
  const renderTab = (): React.ReactElement => {
    switch (currentState.state) {
      case "Start":
        return <TabStart {...tabProps}/>
      case "Downloading":
        return <TabDownloading {...tabProps}/>
      case "Unzipping":
        return <TabUnzipping {...tabProps}/>
      case "WaitingForVentoy":
        return <TabWaitingForVentoy {...tabProps}/>
      case "WaitingForSelect":
        return <TabWaitingForSelect {...tabProps}/>
    }


    return <p>未知状态{currentState.state} <Button onClick={() => next("Start")}>返回</Button></p>
  }

  return (
    <div className="burn__container">
      {existEdgeless && <Alert content="已检测到 Edgeless 启动盘，你是否想访问升级页面？" closable closeElement="前往"
                               onClose={() => myHistory.push("/produce/update")}/>}
      <Steps current={currentState.step} className="burn__steps">
        <Steps.Step title="准备文件" status={(thrown || currentState.step == 0) ? "wait" : undefined}/>
        <Steps.Step title="写入 Ventoy" status={thrown ? "wait" : undefined}/>
        <Steps.Step title="部署 Edgeless" status={thrown ? "wait" : undefined}/>
        {thrown && <Steps.Step title="错误" status="error"/>}
      </Steps>

      <div className="burn__tab-view">
        {renderTab()}
      </div>
    </div>
  );
};
