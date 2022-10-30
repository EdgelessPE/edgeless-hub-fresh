import {IconCheckCircle} from "@arco-design/web-react/icon";
import React from "react";

export const TabLatest = () => {
  return (
    <div className="smt__container">
      <IconCheckCircle className="smt__icon" />
      <div>
        <h1>你已拥有最新版的 Edgeless Beta</h1>
        <p>加入 Edgeless Alpha 内测计划以获取内测版本</p>
      </div>
    </div>
  );
};
