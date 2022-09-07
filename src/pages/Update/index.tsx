import {StateInfo} from "@/components/organisms/StateMachineTabs/class";
import {TabChecking} from "@/pages/Update/TabChecking";
import {State} from "./class"
import {TabThrown} from "@/pages/Update/TabThrown";
import {StateMachineTabs} from "@/components/organisms/StateMachineTabs";
import {TabEmpty} from "@/pages/Update/TabEmpty";
import {TabStart} from "@/pages/Update/TabStart";
import {TabLatest} from "@/pages/Update/TabLatest";


const states: StateInfo<State>[] = [
  {
    state: "Checking",
    step: 0,
    tabContent: TabChecking
  },
  {
    state: "Empty",
    step: 0,
    tabContent: TabEmpty,
    isBranch: true
  },
  {
    state: "Latest",
    step: 0,
    tabContent: TabLatest,
    isBranch: true
  },
  {
    state: "Start",
    step: 0,
    tabContent: TabStart
  },
  {
    state: "Thrown",
    step: 4,
    tabContent: TabThrown
  }
]
const steps = [
  "准备文件",
  "更新 Ventoy",
  "更新 Edgeless"
]

export const Update = () => {
  return (
    <StateMachineTabs
      states={states}
      steps={steps}
      initialState={{state: "Checking", step: 0}}
    />
  );
};
