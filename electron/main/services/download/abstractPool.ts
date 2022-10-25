import {AbstractPoolNode, TaskState} from "./type";
import {log} from "../../log";
import {getTempConfig} from "../config";
import {MAX_DOWNLOADING_TASKS} from "../../constants";

const abstractPool: AbstractPoolNode[] = [],
  queueArray: (() => void)[] = []

type TaskType = TaskState['type']

// 实时全局状态
const globalTaskState: Record<TaskType, number> = {
  completed: 0, downloading: 0, error: 0, paused: 0, queuing: 0, validating: 0
}

function updateGlobalTaskState(next?: TaskType, prev?: TaskType) {
  if (next) {
    globalTaskState[next] = globalTaskState[next] + 1
  }
  if (prev) {
    globalTaskState[prev] = globalTaskState[prev] - 1
  }
  scheduleQueue()
}

// 排队与叫号调度
function queue(callback: () => void) {
  queueArray.push(callback)
  scheduleQueue()
}

function scheduleQueue() {
  // 获取临时配置文件
  const cfg = getTempConfig()
  // 计算空闲位置
  const maxSeats = Math.min(MAX_DOWNLOADING_TASKS, cfg.download.maxDownloadingTasks)
  const availableSeats = maxSeats - globalTaskState.downloading

  if (availableSeats > 0) {
    // 按队列顺序叫号
    for (let i = 0; i < availableSeats; i++) {
      const callback = queueArray.shift()
      if (callback != null) callback()
    }
  }
}

// Pool 操作封装
function add(id: string, state: TaskState) {
  abstractPool.push({
    id,
    state: state
  })
  updateGlobalTaskState(state.type)
}

function update(id: string, nextState: TaskState) {
  for (const node of abstractPool) {
    if (node.id == id) {
      const prevType = node.state.type, nextType = nextState.type
      if (prevType != nextType) {
        updateGlobalTaskState(nextType, prevType)
      }
      node.state = nextState
      return
    }
  }
  log(`Error:Fatal:Can't update abstract download pool node : Task ${id} not found`)
}

function remove(id: string) {
  for (let i = 0; i < abstractPool.length; i++) {
    const node = abstractPool[i]
    if (node.id == id) {
      updateGlobalTaskState(undefined, node.state.type)
      abstractPool.splice(i, 1)
      return
    }
  }
  log(`Error:Fatal:Can't remove abstract download pool node : Task ${id} not found`)
}

export default {
  add,
  update,
  remove,
  queue
}
