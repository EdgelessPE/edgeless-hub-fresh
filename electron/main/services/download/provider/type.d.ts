import {Result} from "ts-results";
import {Subscriber} from "rxjs";
import {DownloadProviderInfo} from "../../../../../types/download";

type MayErrorReturned = Promise<Result<null, string>>;
export type AddTaskFn = (
  url: string,
  dir: string,
  suggested: AddTaskSuggested,
  subscriber: Subscriber<TaskProgressNotification> // 用于通知下载进度、速度
) => Promise<Result<AddTaskReturned, string>>;

export interface Provider {
  info: DownloadProviderInfo;
  addTask: AddTaskFn;

  init(): MayErrorReturned;
}

export interface AddTaskSuggested {
  fileName: string;
  totalSize: number;
  // speedLimit: number;
  // threads: number;
}

interface AddTaskReturned {
  targetPosition: string; // 文件最终绝对路径，理论上应该 == path.join(dir,suggested.fileName)
  handler: ProviderHandler;
}

interface ProviderHandler {
  start(): MayErrorReturned;

  remove(): MayErrorReturned;

  continue?(): MayErrorReturned;

  pause?(): MayErrorReturned;
}

export interface TaskProgressNotification {
  percent: number; // 进度百分比，取值0-100
  speed: number; // 下载速度，单位 B/s
}
