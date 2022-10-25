import {PoolMapNode} from "./type";
import {Err, Ok, Result} from "ts-results";
import {emitPaused, emitPending, removeTaskNode,} from "./eventBus";
import * as path from "path";
import fs from "fs";
import {log} from "../../log";

const map = new Map<string, PoolMapNode>();

async function pauseTask(id: string): Promise<Result<null, string>> {
  // 获取任务入口
  if (!map.has(id)) {
    return new Err(`Error:Can't find task ${id}`)
  }
  const entry = map.get(id)!;
  // 检查任务是否支持暂停
  if (entry.returned?.handler == null) {
    return new Err(
      `Error:Task ${id} used download provider ${entry.provider} which doesn't support pausing`
    );
  }
  // 仅当当前状态机为 downloading 时允许暂停
  if (entry.status.type != "downloading") {
    return new Err(`Error:Task ${id} current status ${entry.status.type} doesn't support pausing`)
  }

  // 将状态机配置为 pending
  emitPending(id)

  // 通过把手进行暂停
  const pauseRes = await entry.returned.handler.pause()
  if (pauseRes.err) return pauseRes

  // 更新状态机为 paused
  emitPaused(id)

  return new Ok(null)
}

async function continueTask(id: string): Promise<Result<null, string>> {
  if (!map.has(id)) {
    return new Err(`Error:Can't find task ${id}`);
  }
  const entry = map.get(id)!;

  if (entry.returned?.handler == null) {
    return new Err(
      `Error:Task ${id} used download provider ${entry.provider} which doesn't support continuation`
    );
  }
  if (entry.status.type != "paused") {
    return new Err(
      `Error:Task ${id} current status ${entry.status.type} doesn't allow continuation`
    );
  }

  emitPending(id)

  const continueRes = await entry.returned.handler.continue()
  if (continueRes.err) return continueRes

  // 此处不变更状态机至 downloading ，由 provider 自发产生值更新下载进度

  return new Ok(null)
}

async function removeTask(id: string, removeFile = false): Promise<Result<null, string>> {
  if (!map.has(id)) {
    return new Err(`Error:Can't find task ${id}`)
  }
  const entry = map.get(id)!

  // 仅当任务状态机处于终态时允许移除
  const status = entry.status.type
  if (status != "error" && status != "completed") {
    return new Err(`Error:Task ${id} current status ${status} doesn't allow removal`)
  }

  // 移除文件
  if (removeFile) {
    const target = entry.returned?.targetPosition || path.join(entry.params.dir, entry.params.suggested.fileName)
    if (fs.existsSync(target)) {
      try {
        fs.unlinkSync(target)
      } catch (e) {
        log(`Warning:Can't delete file ${target} when remove task ${id}`)
      }
    }
  }

  // 调用任务池封装
  removeTaskNode(id)

  return new Ok(null)
}

export {
  removeTask,
  pauseTask,
  continueTask,
};
