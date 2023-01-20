import { RendererSequence } from "../../../types/sequence";
import { TaskStatus } from "../../../types";
import { addPackageTaskStatusAdapter } from "./constitutors/addPackage";

type Current = RendererSequence["current"];

function genTaskStatus(msPoolKey: string, cur: Current): TaskStatus {
  const adapters: Record<string, (cur: Current) => TaskStatus> = {
    addPackage: addPackageTaskStatusAdapter,
  };
  return adapters[msPoolKey](cur);
}

export { genTaskStatus };
