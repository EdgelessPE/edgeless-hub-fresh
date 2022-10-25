import {AddTaskReturned, AddTaskSuggested, TaskProgressNotification,} from "./provider/type";
import {Integrity} from "../../../../types";

interface TaskMeta {
  provider: string;
  params: {
    url: string;
    dir: string;
    suggested: AddTaskSuggested;
    integrity?: Integrity;
  };
  returned: AddTaskReturned | null;
}

interface AbstractPoolNode {
  id: string
  state: TaskState
}

type TaskState = {
  type:
    | "queuing"
    | "downloading"
    | "validating"
    | "error"
    | "completed"
    | "paused";
  payload: TaskProgressNotification | string | null;
};

export {TaskState, TaskMeta, AbstractPoolNode};
