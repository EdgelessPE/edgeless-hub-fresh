import {AddTaskReturned, AddTaskSuggested, TaskProgressNotification,} from "./provider/type";
import {Integrity} from "../../../../types";
import {Result} from "ts-results";

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

interface DownloadTaskHandler {
  state: TaskState
  allowPause: () => boolean

  pause: () => Promise<Result<null, string>>
  continue: () => Promise<Result<null, string>>
  remove: (removeFile: boolean) => Promise<Result<null, string>>

  onChange: (callback: (state: TaskState) => void) => void
}

export {TaskState, TaskMeta, DownloadTaskHandler, AbstractPoolNode};
