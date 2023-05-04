import { TaskProgressNotification } from "../../../../types/module";

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

export { TaskProgressNotification, TaskState };
