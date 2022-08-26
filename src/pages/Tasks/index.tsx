import "./index.scss"
import {DownloadCard} from "@/pages/Tasks/DownloadCard";
import {useEffect, useState} from "react";

export const Tasks = () => {
  const [p, setP] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setP(prev => Math.min(prev + 5, 100))
    }, 3000)
  }, [])
  return (
    <div className="tasks__container">

      <DownloadCard
        id="0"
        data={{
          "name": "WiseCare365_6.1.3.598_Horatio Shaw.7z",
          "size": 751460400,
          "timestamp": 1638634984,
          "hash": "d4826848c7b88d3ed9acdcb5c04770e6675a4b411b15b559856e826fe1e8e886"
        }}
        status={{
          state: "Downloading",
          versionLocal: "0.0.0",
          versionOnline: "1.1.4",
          percentage: p
        }}
      />
      <DownloadCard
        id="1"
        data={{
          "name": "DuplicateFilesFinder_0.8.0.0_undefined（bot）.7z",
          "size": 1016385,
          "timestamp": 1644908838,
          "hash": "1c45af1ae01dc140ed15240518945b32d9af8d5a3fa533a323334ef821525956"
        }}
        status={{
          state: "Downloading",
          versionLocal: "0.0.0",
          versionOnline: "1.1.4",
          percentage: 57
        }}
      />
      <DownloadCard
        id="2"
        data={{
          "name": "Windows超级管理器_9.42.0.0_Cno.7z",
          "size": 9886180,
          "timestamp": 1655914683,
          "hash": "329332376ca5f08e75924b13abfb3c42f2974e261efee0b326df9cdace16fadd"
        }}
        status={{
          state: "Installing",
          versionLocal: "0.0.0",
          versionOnline: "1.1.4",
          percentage: 96
        }}
      />
      <DownloadCard
        id="3"
        data={{
          "name": "TrafficMonitor_1.83.0.0_undefined（bot）.7z",
          "size": 940188,
          "timestamp": 1649481048,
          "hash": "87f9b885e3796d0c014baa6077ad9a69fc0e99ed9678ffe99961bbee957ed14f"
        }}
        status={{
          state: "Pending",
          versionLocal: "0.0.0",
          versionOnline: "1.1.4",
          percentage: 96
        }}
      />
      <DownloadCard
        id="4"
        data={{
          "name": "DuplicateFilesFinder_0.8.0.0_undefined（bot）.7z",
          "size": 1016385,
          "timestamp": 1644908838,
          "hash": "1c45af1ae01dc140ed15240518945b32d9af8d5a3fa533a323334ef821525956"
        }}
        status={{
          state: "Upgradable",
          versionLocal: "0.0.0",
          versionOnline: "1.1.4",
          percentage: 96
        }}
      />
      <DownloadCard
        id="5"
        data={{
          "name": "John_20210929.1.0_undefined.7z",
          "size": 28701235,
          "timestamp": 1633269606,
          "hash": "bb4f2354615b14794338f2c6b80c49db14be0e8aa3e9e487e6a3050d85d793e6"
        }}
        status={{
          state: "Installed",
          versionLocal: "0.0.0",
          versionOnline: "1.1.4",
          percentage: 96
        }}
      />
    </div>
  );
};
