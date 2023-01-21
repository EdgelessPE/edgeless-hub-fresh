import { RendererSequence } from "../../../types/sequence";
import { TaskStatus } from "../../../types";
import { addPackageTaskStatusAdapter } from "./constitutors/addPackage";

type Current = RendererSequence["current"];

function genTaskStatus(msPoolKey: string, seq: RendererSequence): TaskStatus {
  // console.log('seq',seq)
  if (seq.state == "Error" || seq.state == "Pending") {
    return {
      state: seq.state,
    };
  }
  if (seq.state == "Completed") {
    return {
      state: "Pending", // 序列执行完成后进入 Pending 状态，以等待其他发现器发现并更改状态
    };
  }
  const adapters: Record<string, (cur: Current) => TaskStatus> = {
    addPackage: addPackageTaskStatusAdapter,
  };
  return adapters[msPoolKey](seq.current);
}

export { genTaskStatus };
