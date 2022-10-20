import {Integrity} from "./index";
import {PoolStatus} from "../electron/main/services/download/type";

interface DownloadProviderInfo {
  name: string;
  description: string;
  id: string;
}


interface RendererViewTask {
  id: string
  fileName: string
  totalSize: number
  url: string
  status: PoolStatus;
  targetPosition: string
  supportPausing: boolean
  integrity?: Integrity
}

export {
  DownloadProviderInfo,
  RendererViewTask,
}
