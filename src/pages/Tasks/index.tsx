import "./index.scss";
import { Button, Tabs } from "@arco-design/web-react";
import { TabRunning, TabRunningProps } from "@/pages/Tasks/TabRunning";
import { TabUpgradable, TabUpgradableProps } from "@/pages/Tasks/TabUpgradable";
import { TabInstalled, TabInstalledProps } from "@/pages/Tasks/TabInstalled";
import React, { useState } from "react";
import { addMultiSequence } from "@/services/sequence";
import { listDownloadPool } from "@/services/downloadPool";

export const Tasks = () => {
  const [p, setP] = useState(0);
  // useEffect(() => {
  //   setInterval(() => {
  //     setP((prev) => Math.min(prev + 1, 100));
  //   }, 1000);
  // }, []);

  const down = async () => {
    // const idRes = await createTask(
    //   "https://pineapple.edgeless.top/disk/插件包/实用工具/禁用小键盘_1.0.0.0_Cno.7z",
    //   "禁用小键盘_1.0.0.0_Cno.7z",
    //   140
    // );
    // console.log(idRes);
    await addMultiSequence("addPackage", {
      url: "https://pineapple.edgeless.top/disk/插件包/实用工具/禁用小键盘_1.0.0.0_Cno.7z",
      fileName: "禁用小键盘_1.0.0.0_Cno.7z",
      totalSize: 140,
    });
  };

  const list = () => {
    listDownloadPool().then(console.log);
  };

  const running: TabRunningProps["array"] = [
      {
        data: {
          name: "WiseCare365_6.1.3.598_Horatio Shaw.7z",
          size: 751460400,
          timestamp: 1638634984,
        },
        status: {
          state: "Downloading",
          percentage: p,
        },
      },
      {
        data: {
          name: "DuplicateFilesFinder_0.8.0.0_undefined（bot）.7z",
          size: 1016385,
          timestamp: 1644908838,
        },
        status: {
          state: "Downloading",
          percentage: 57,
        },
      },
      {
        data: {
          name: "Windows超级管理器_9.42.0.0_Cno.7z",
          size: 9886180,
          timestamp: 1655914683,
        },
        status: {
          state: "Installing",
          percentage: 96,
        },
      },
      {
        data: {
          name: "TrafficMonitor_1.83.0.0_undefined（bot）.7z",
          size: 940188,
          timestamp: 1649481048,
        },
        status: {
          state: "Pending",
          percentage: 96,
        },
      },
      {
        data: {
          name: "二维码识别PC版_1.0_System3206.7z",
          size: 1835863,
          timestamp: 1658923858,
        },
        status: {
          state: "Downloading",
          percentage: 57,
        },
      },
    ],
    upgradable: TabUpgradableProps["array"] = [
      {
        online: {
          name: "John_20220929.1.0_undefined.7z",
          size: 198711237,
          timestamp: 1633269606,
        },
        local: {
          name: "John_20210929.1.0_undefined.7z",
          size: 128701236,
          timestamp: 1633269606,
          path: "bb4f2354615b14794338f2c6b80c49db14be0e8aa3e9e487e6a3050d85d793e6",
          flags: new Set(["f"]),
        },
      },
      {
        online: {
          name: "爱思助手_7.98.53.02_泉水叮咚.7z",
          size: 351331566,
          timestamp: 1649150122,
        },
        local: {
          name: "爱思助手_7.98.54.02_泉水叮咚.7z",
          size: 351331566,
          timestamp: 1649150122,
          path: "036e1a824fed20730b07b59de7d368183e11594d57bc62c8a0ea53c87781e95b",
          flags: new Set(["l"]),
        },
      },
      {
        online: {
          name: "Edgeless密码管家_1.1.0.0_Cno.7z",
          size: 54524,
          timestamp: 1610208801,
        },
        local: {
          name: "Edgeless密码管家_1.1.0.0_Cno.7z",
          size: 54524,
          timestamp: 1610208801,
          path: "7615498febabf4070262c730ea11ea52f917dce66e410e8a4b5bc2fe07754a9c",
        },
      },
      {
        online: {
          name: "微PE工具包_2.1.0.0_Cno.7z",
          size: 14978651,
          timestamp: 1592385317,
        },
        local: {
          name: "微PE工具包_2.1.0.1_Cno.7z",
          size: 24978651,
          timestamp: 1592385317,
          path: "8007cfed1fe5355ceaf3f1ada59bd4c8a78f53fb76663eb56663310ceeaf081e",
        },
      },
    ],
    installed: TabInstalledProps["array"] = [
      {
        name: "Z软媒魔方_6.2.5.0_NewbieXvwu.7z",
        size: 30376491,
        timestamp: 1639226532,
        path: "a97e9ce0d244772ed74af0f12cb1fb77475a15608cb5ff84331d452e823fa82e",
      },
      {
        name: "Ueli_8.22.1.0_Cno（bot）.7z",
        size: 77608457,
        timestamp: 1657656751,
        path: "b1b27579f0c77dbaaecad9d74d2a9423040b92854416faf4edf7d12d6ad04089",
        flags: new Set(["f"]),
      },
      {
        name: "Windows 登录解锁工具_1.5.0.0_Cno.7z",
        size: 242462,
        timestamp: 1648646313,
        path: "a46f96ac0523e7ca53977c485a59cefee9c5893b905e659bb523e2906840288f",
        flags: new Set(["f", "l"]),
      },
      {
        name: "Edgeless密码管家_1.1.0.0_Cno.7z",
        size: 54524,
        timestamp: 1610208801,
        path: "7615498febabf4070262c730ea11ea52f917dce66e410e8a4b5bc2fe07754a9c",
        flags: new Set(["l"]),
      },
    ];

  return (
    <div className="tasks__container">
      <Button onClick={list}>下载</Button>
      <Tabs defaultActiveTab="1" className="tasks__tabs">
        <Tabs.TabPane key="1" title={`进行中（${running.length}）`}>
          <TabRunning array={running} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title={`可更新（${upgradable.length}）`}>
          <TabUpgradable
            array={upgradable}
            onUpgradeAll={(list) => console.log(list)}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title={`已安装（${installed.length}）`}>
          <TabInstalled array={installed} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
