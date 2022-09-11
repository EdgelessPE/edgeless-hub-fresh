import { IconExclamationCircle } from "@arco-design/web-react/icon";
import { Button, Message, Select, Space } from "@arco-design/web-react";
import { useState } from "react";
import { UpdateTabProps } from "./class";
import { reportIssue } from "@/pages/Burn/utils";

export const TabWaitingForSelect = ({ next, sharedState }: UpdateTabProps) => {
  const possibleDisks = ["C", "D", "E"];
  const [selected, setSelected] = useState("");

  const confirm = () => {
    if (selected != "") {
      sharedState.set("ventoy_disk", selected);
      next("Writing");
    } else {
      Message.error("请选择更新了 Ventoy 的 U 盘盘符");
    }
  };
  return (
    <div className="smt__container">
      <IconExclamationCircle className="smt__icon" />
      <div>
        <h1>请确保你已经更新了 Ventoy，然后手动选择你的 U 盘盘符</h1>
        <p>如果存在两个盘符，请选择卷标为“Ventoy”的那一个</p>
        <p>
          如果你希望反馈问题请
          <a
            style={{ color: "rgb(var(--arcoblue-6))", cursor: "pointer" }}
            onClick={reportIssue}
          >
            点击此处
          </a>
        </p>
      </div>
      <Space>
        <b>选择更新了 Ventoy 的 U 盘盘符：</b>
        <Select
          style={{ width: "120px" }}
          value={selected}
          onChange={(val) => setSelected(val)}
        >
          {possibleDisks.map((value) => (
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Space>
      <Space>
        <Button type="primary" onClick={confirm}>
          确认
        </Button>
        <Button onClick={() => next("WaitingForVentoy")}>返回</Button>
      </Space>
    </div>
  );
};
