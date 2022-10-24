import { PoolMapNode } from "./type";
import { RendererViewTask } from "../../../../types/download";
import path from "path";

let taskCount = 0;

function getTaskId(provider: string): string {
  return provider + "_" + taskCount++;
}

function convertPoolMapNode2RendererViewTask(
  taskId: string,
  n: PoolMapNode
): RendererViewTask {
  return {
    id: taskId,
    fileName: n.params.suggested.fileName,
    totalSize: n.params.suggested.totalSize,
    url: n.params.url,
    status: n.status,
    targetPosition:
      n.returned?.targetPosition ??
      path.join(n.params.dir, n.params.suggested.fileName),
    supportPausing: n.returned?.handler != null,
    integrity: n.params.integrity,
  };
}

export {
  getTaskId,
  convertPoolMapNode2RendererViewTask
}
