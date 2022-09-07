import React, {useState} from "react";
import {Props, StateInfo, StateMachineNode, TabProps} from "./class";
import {Button, Steps} from "@arco-design/web-react";
import {log} from "@/utils";

function getNextState<State extends string>(states: StateInfo<State>[], current: StateMachineNode<State>, allowBranch = false): StateMachineNode<State> {
  for (let i = 0; i < states.length - 2; i++) {
    const node = states[i]
    if (!allowBranch && node.isBranch) continue
    if (node.state == current.state) {
      const nextNode = states[i + 1]
      if (nextNode.isBranch) return getNextState(states, nextNode, true)
      else return {
        state: nextNode.state,
        step: nextNode.step
      }
    }
  }
  console.error(`Fatal:Shouldn't receive state ${current.state}`)
  return {state: current.state, step: current.step}
}

export function StateMachineTabs<State extends string>({states, steps, initialState}: Props<State>) {
  const [currentState, setCurrentState] = useState(initialState)

  const next = (state?: State) => {
    if (state != null) {
      for (let node of states) {
        if (node.state == state) {
          setCurrentState({
            state: node.state,
            step: node.step
          })
          log(`Info:Switch to given state ${state}`)
          return
        }
      }
      log(`Error:Fatal:Unknown next state ${state}`)
      return
    }
    setCurrentState((prev: StateMachineNode<State>) => {
      const ns = getNextState(states, prev);
      log(`Info:Switch to next state ${ns.state}`)
      return ns
    })
  }

  const tabProps: TabProps<State> = {
    next
  }
  const renderTab = () => {
    for (let node of states) {
      if (currentState.state == node.state) {
        return React.createElement(
          node.tabContent,
          tabProps
        )
      }
    }
    return <p>未知状态{currentState.state} <Button onClick={() => next(states[0].state)}>返回</Button></p>
  }

  const thrown = currentState.state == "Thrown"
  return (
    <div className="burn__container">
      <Steps current={currentState.step} className="burn__steps">
        {steps.map((title, index) => {
          const stepStatue = (thrown || currentState.step == 0) ? "wait" : undefined
          return (
            <Steps.Step key={title} title={title} status={stepStatue}/>
          )
        })}
        {thrown && <Steps.Step title="错误" status="error"/>}
      </Steps>

      <div className="burn__tab-view">
        {renderTab()}
      </div>
    </div>
  )
}
