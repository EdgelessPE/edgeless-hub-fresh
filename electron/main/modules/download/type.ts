import {Integrity} from "../../../../types";
import {TaskProgressNotification} from "../../../../types/module";

interface AbstractPoolNode {
  id: string;
  state: TaskState;
  meta: TaskMeta;
}

interface TaskMeta {
  provider: string;
  params: {
    url: string;
    fileName: string;
    dir: string;
    totalSize: number;
    integrity?: Integrity;
  };
}

interface TaskState {
  type:
    | "queuing"
    | "downloading"
    | "validating"
    | "error"
    | "completed"
    | "paused";
  payload: TaskProgressNotification | string | null;
}

export { TaskProgressNotification, TaskState, TaskMeta, AbstractPoolNode };
