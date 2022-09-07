import React from "react";

interface StateInfo<State extends string> {
  state: State,
  step: number,
  isBranch?: boolean,
  tabContent: (props: TabProps<State>) => React.ReactElement
}

interface StateMachineNode<State extends string> {
  state: StateInfo<State>["state"],
  step: StateInfo<State>["step"],
}

interface Props<State extends string> {
  states: StateInfo<State>[],
  steps: string[], //对应states中从1开始的step，不包含隐藏的错误tab
  initialState: StateMachineNode<State>
}

interface TabProps<State extends string> {
  next: (state?: State) => void,
  sharedState: Map<string, any>
}

export type {
  StateInfo,
  TabProps,
  StateMachineNode,
  Props,
}
