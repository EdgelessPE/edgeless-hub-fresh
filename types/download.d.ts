import { Integrity } from "./index";
import { TaskState } from "../electron/main/modules/download/type";

interface DownloadProviderInfo {
  name: string;
  description: string;
  id: string;
}

interface RendererViewTask {
  id: string;
  fileName: string;
  totalSize: number;
  url: string;
  state: TaskState;
  targetPosition: string;
  supportPausing: boolean;
  integrity?: Integrity;
}

interface DownloadParams {
  url: string;
  fileName: string;
  totalSize: number;
  integrity?: Integrity;
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

interface AbstractPoolNode {
  id: string;
  state: TaskState;
  meta: TaskMeta;
}

export {
  DownloadProviderInfo,
  RendererViewTask,
  DownloadParams,
  AbstractPoolNode,
  TaskMeta,
};
