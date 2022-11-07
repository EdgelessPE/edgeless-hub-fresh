import {Button} from "@arco-design/web-react";
import React from "react";
import {AlphaTabProps, UpdateAlpha} from "./type";
import {FireOutlined} from "@ant-design/icons";

export const TabStart = ({next, sharedState}: AlphaTabProps) => {
  const updateAlpha: UpdateAlpha = sharedState.get("update_kernel");
  return (
    <div className="smt__container">
      <FireOutlined className="smt__icon"/>
      <div>
        <h1>有可用的更新</h1>
        <p>
          {`Edgeless Alpha：${updateAlpha.local.name} -> ${updateAlpha.online.name}`}
        </p>
      </div>
      <Button type="primary" onClick={() => next()}>
        立即更新
      </Button>
    </div>
  );
};
