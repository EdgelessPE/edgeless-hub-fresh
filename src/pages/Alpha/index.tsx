import {StateInfo} from "@/components/organisms/StateMachineTabs/class";
import {StateMachineTabs} from "@/components/organisms/StateMachineTabs";
import {State} from "./types";
import {TabInput} from "./TabInput";
import {TabThrown} from "./TabThrown";
import {TabEmpty} from "./TabEmpty";
import {TabLatest} from "./TabLatest";
import {TabStart} from "./TabStart";
import {TabDownloading} from "./TabDownloading";
import {TabUnzipping} from "./TabUnzipping";
import {TabWriting} from "./TabWriting";
import {TabValidating} from "./TabValidating";
import React from "react";

const states: StateInfo<State>[] = [
  {
    state: "Input",
    step: -1,
    tabContent: TabInput,
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
    state: "Writing",
    step: 2,
    tabContent: TabWriting,
  },
  {
    state: "Validating",
    step: 2,
    tabContent: TabValidating,
  },
  {
    state: "Finish",
    step: 3,
    tabContent: TabLatest,
  },
  {
    state: "Thrown",
    step: 3,
    tabContent: TabThrown,
    isBranch: true,
  },
];
const steps = ["准备文件", "部署 Edgeless Alpha"];

export const Alpha = () => {
  return (
    <StateMachineTabs
      states={states}
      steps={steps}
      initialState={{ state: "Input", step: -1 }}
    />
  );
};
