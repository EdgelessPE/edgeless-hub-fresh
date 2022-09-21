import {
  Button,
  Checkbox,
  Input,
  Message,
  Space,
} from "@arco-design/web-react";
import { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { AlphaTabProps } from "./types";
import { IconCloseCircle } from "@arco-design/web-react/icon";
import { FileNodeLocal } from "types/local";

const kernelLocal: FileNodeLocal = {
    name: "Edgeless_Beta_4.1.0.iso",
    version: "4.1.0",
    size: 816 * 1024 * 1024,
    timestamp: 0,
    path: "",
  },
  kernelOnline: FileNodeLocal = {
    name: "Edgeless_Alpha_4.1.2.wim",
    version: "4.1.2",
    size: 826 * 1024 * 1024,
    timestamp: 0,
    path: "",
  };

export const TabInput = ({ next, sharedState }: AlphaTabProps) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputErrorState, setInputErrorState] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const onCheckboxChange = () => {
    setDisabled((prev) => !prev);
  };
  const onInput = (val: string) => {
    if (inputErrorState) setInputErrorState(false);
    setText(val);
  };
  const submit = () => {
    setLoading(true);
    if (text == "") {
      sharedState.set("update_kernel", {
        online: kernelOnline,
        local: kernelLocal,
      });
      next();
    } else {
      setInputErrorState(true);
      Message.error("无效的 Edgeless Alpha Token");
    }
    setLoading(false);
  };

  return (
    <div className="smt__container">
      <LockOutlined className="smt__icon" />
      <div>
        <h1>需要验证你的 Edgeless Alpha Token</h1>
        <p>
          如果您不知道如何获取此 Token，我们亦无可奉告，因为这说明您不是
          Edgeless Alpha 计划的目标用户
        </p>
      </div>
      <Space direction="vertical" size="large" style={{ width: "50%" }}>
        <Input
          placeholder="输入 Edgeless Alpha Token （内测邀请码）"
          value={text}
          error={inputErrorState}
          onChange={onInput}
          onPressEnter={submit}
          allowClear
          suffix={
            inputErrorState ? (
              <IconCloseCircle style={{ color: "rgb(var(--red-6))" }} />
            ) : undefined
          }
        />
        <Space>
          <Checkbox value={!disabled} onChange={onCheckboxChange} />
          我已阅读并同意{" "}
          <a style={{ color: "rgb(var(--arcoblue-6))", cursor: "pointer" }}>
            Edgeless Alpha 计划须知
          </a>
        </Space>
        <Button
          type="primary"
          disabled={disabled}
          loading={loading}
          onClick={submit}
        >
          验证
        </Button>
      </Space>
    </div>
  );
};
