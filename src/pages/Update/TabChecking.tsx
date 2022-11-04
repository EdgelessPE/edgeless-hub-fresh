import {CloudSyncOutlined} from "@ant-design/icons";
import {Button, Spin} from "@arco-design/web-react";
import {UpdateTabProps} from "./type";
import {FileNodeLocal} from "types/local";
import React from "react";

export const TabChecking = ({ next, sharedState }: UpdateTabProps) => {
  const kernelOnline: FileNodeLocal = {
      name: "Edgeless_Beta_4.1.0.iso",
      version: "4.1.0",
      size: 816 * 1024 * 1024,
      timestamp: 0,
      path: "",
    },
    kernelLocal: FileNodeLocal = {
      name: "Edgeless_Beta_3.2.0.wim",
      version: "3.2.0",
      size: 816 * 1024 * 1024,
      timestamp: 0,
      path: "",
    };
  return (
    <div className="smt__container">
      <CloudSyncOutlined className="smt__icon" />
      <h1>正在检查可用更新</h1>
      <Spin size={40} />
      <Button
        onClick={() => {
          sharedState.set("update_kernel", {
            online: kernelOnline,
            local: kernelLocal,
          });
          next();
        }}
      >
        下一步
      </Button>
    </div>
  );
};
