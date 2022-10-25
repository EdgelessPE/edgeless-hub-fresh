import {Integrity} from "../../types";
import {Result} from "ts-results";
import bridge from "@/bridge/method";


async function createTask(
  url: string,
  fileName: string,
  totalSize: number,
  integrity?: Integrity
): Promise<Result<string, string>> {
  return bridge("createTask", url, fileName, totalSize, integrity)
}

async function removeTask(id: string, removeFile = false): Promise<Result<null, string>> {
  return bridge("removeTask", id, removeFile)
}

async function pauseTask(id: string): Promise<Result<null, string>> {
  return bridge("pauseTask", id)
}

async function continueTask(id: string): Promise<Result<null, string>> {
  return bridge("continueTask", id)
}

export {
  createTask,
  removeTask,
  pauseTask,
  continueTask
}