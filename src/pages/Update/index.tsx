import { StateInfo } from "@/components/organisms/StateMachineTabs/class";
import { StateMachineTabs } from "@/components/organisms/StateMachineTabs";
import { State } from "./types";
import { TabChecking } from "./TabChecking";
import { TabThrown } from "./TabThrown";
import { TabEmpty } from "./TabEmpty";
import { TabStart } from "./TabStart";
import { TabLatest } from "./TabLatest";
import { TabDownloading } from "./TabDownloading";
import { TabUnzipping } from "./TabUnzipping";
import { TabWaitingForVentoy } from "./TabWaitingForVentoy";
import { TabWaitingForSelect } from "./TabWaitingForSelect";
import { TabWriting } from "./TabWriting";
import { TabValidating } from "./TabValidating";

const states: StateInfo<State>[] = [
  {
    state: "Checking",
    step: -1,
    tabContent: TabChecking,
  },
  {
    state: "Empty",
    step: -1,
    tabContent: TabEmpty,
    isBranch: true,
  },
  {
    state: "Latest",
    step: -1,
    tabContent: TabLatest,
    isBranch: true,
  },
  {
    state: "Start",
    step: 0,
    tabContent: TabStart,
  },
  {
    state: "Downloading",
    step: 1,
    tabContent: TabDownloading,
  },
  {
    state: "Unzipping",
    step: 1,
    tabContent: TabUnzipping,
  },
  {
    state: "WaitingForVentoy",
    step: 2,
    tabContent: TabWaitingForVentoy,
  },
  {
    state: "WaitingForSelect",
    step: 2,
    tabContent: TabWaitingForSelect,
    isBranch: true,
  },
  {
    state: "Writing",
    step: 3,
    tabContent: TabWriting,
  },
  {
    state: "Validating",
    step: 3,
    tabContent: TabValidating,
  },
  {
    state: "Finish",
    step: 4,
    tabContent: TabLatest,
  },
  {
    state: "Thrown",
    step: 4,
    tabContent: TabThrown,
    isBranch: true,
  },
];
const steps = ["准备文件", "更新 Ventoy", "更新 Edgeless"];

export const Update = () => {
  return (
    <StateMachineTabs
      states={states}
      steps={steps}
      initialState={{ state: "Checking", step: -1 }}
    />
  );
};
