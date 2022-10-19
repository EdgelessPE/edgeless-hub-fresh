import {
  AddTaskReturned,
  AddTaskSuggested,
  TaskProgressNotification,
} from "./provider/type";
import { Integrity } from "../../../../types";

interface PoolMapNode {
  provider: string;
  params: {
    url: string;
    dir: string;
    suggested: AddTaskSuggested;
    integrity?: Integrity;
  };
  returned: AddTaskReturned | null;
  status: PoolStatus;
}

type PoolStatus = {
  type:
    | "downloading"
    | "validating"
    | "error"
    | "completed"
    | "paused"
    | "pending";
  payload: TaskProgressNotification | string | null;
};

interface AddTaskEventPayload {
  provider: PoolMapNode["provider"];
  params: PoolMapNode["params"];
  returned: PoolMapNode["returned"];
}

export { PoolStatus, PoolMapNode, AddTaskEventPayload };
