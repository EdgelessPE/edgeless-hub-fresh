import {Integrity} from "../../../../types";


interface AbstractPoolNode {
  id: string
  state: TaskState
  meta: TaskMeta
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

interface TaskProgressNotification {
  percent: number; // 进度百分比，取值0-100
  speed: number; // 下载速度，单位 B/s
}

export {
  TaskProgressNotification,
  TaskState,
  TaskMeta,
  AbstractPoolNode
}
