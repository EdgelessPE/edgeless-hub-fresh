import {IconExclamationCircle} from "@arco-design/web-react/icon";
import {TabProps} from "@/pages/Burn/class";
import {Button, Message, Select, Space} from "@arco-design/web-react";
import {useState} from "react";
import {sharedState} from "@/pages/Burn/sharedState";

export const TabWaitingForSelect = ({next}: TabProps) => {
  const possibleDisks = ["C", "D", "E"]
  const [selected, setSelected] = useState("")

  const confirm = () => {
    if (selected != "") {
      sharedState.set("ventoyDisk", selected)
      next("Writing")
    } else {
      Message.error("请选择写入了 Ventoy 的 U 盘盘符")
    }
  }
  return (
    <div className="burn__tab-inner__container">
      <IconExclamationCircle className="burn__tab-inner__icon"/>
      <div>
        <h1>请确保您已经写入了 Ventoy 到 U 盘，然后手动选择您的 U 盘盘符</h1>
        <p>如果存在两个盘符，请选择卷标为“Ventoy”的那一个</p>
        <p>如果你希望反馈问题请<a style={{color: "rgb(var(--arcoblue-6))", cursor: "pointer"}}>点击此处</a></p>
      </div>
      <Space>
        <b>选择写入了 Ventoy 的 U 盘盘符：</b>
        <Select style={{width: "120px"}} value={selected} onChange={val => setSelected(val)}>
          {
            possibleDisks.map(value => (
              <Select.Option key={value} value={value}>
                {value}
              </Select.Option>
            ))
          }
        </Select>
      </Space>
      <Space>
        <Button type="primary" onClick={confirm}>确认</Button>
        <Button onClick={() => next("WaitingForVentoy")}>返回</Button>
      </Space>
    </div>
  )
}
