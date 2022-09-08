import './index.scss'
import React from "react";
import {Alert} from "@arco-design/web-react";
import {TabStart} from "./TabStart";
import {myHistory} from "@/router/history";
import {TabDownloading} from "./TabDownloading";
import {TabUnzipping} from "./TabUnzipping";
import {TabWaitingForVentoy} from "./TabWaitingForVentoy";
import {TabWaitingForSelect} from "./TabWaitingForSelect";
import {TabWriting} from "./TabWriting";
import {TabValidating} from "./TabValidating";
import {TabFinish} from "./TabFinish";
import {TabThrown} from "./TabThrown";
import {StateMachineTabs} from "@/components/organisms/StateMachineTabs";


export const Burn = () => {
  const existEdgeless = false
  return (
    <StateMachineTabs
      states={[
        {state: "Start", step: 0, tabContent: TabStart},
        {state: "Downloading", step: 1, tabContent: TabDownloading},
        {state: "Unzipping", step: 1, tabContent: TabUnzipping},
        {state: "WaitingForVentoy", step: 2, tabContent: TabWaitingForVentoy},
        {state: "WaitingForSelect", step: 2, tabContent: TabWaitingForSelect, isBranch: true},
        {state: "Writing", step: 3, tabContent: TabWriting},
        {state: "Validating", step: 3, tabContent: TabValidating},
        {state: "Finish", step: 4, tabContent: TabFinish},
        {state: "Thrown", step: 4, tabContent: TabThrown, isBranch: true},
      ]}
      steps={["准备文件", "写入 Ventoy", "部署 Edgeless"]}
      initialState={{state: "Start", step: 0}}
      alertContent={
        existEdgeless ? (
          <Alert
            content="已检测到 Edgeless 启动盘，你是否想访问升级页面？"
            closable
            closeElement="前往"
            onClose={() => myHistory.push("/produce/update")}
          />
        ) : undefined
      }
    />
  );
};
