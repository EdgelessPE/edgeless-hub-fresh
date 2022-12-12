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

export { DownloadProviderInfo, RendererViewTask, DownloadParams };
