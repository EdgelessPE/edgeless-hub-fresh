import bridge from "@/bridge/method";
import { AbstractPoolNode } from "../../types/download";

async function listDownloadPool() {
  return bridge<AbstractPoolNode[]>("listDownloadPool");
}

export { listDownloadPool };
