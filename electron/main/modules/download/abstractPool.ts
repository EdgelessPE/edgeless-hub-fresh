import {AbstractPoolNode, TaskMeta, TaskState} from "./type";
import {log} from "../../log";
import {MAX_DOWNLOADING_TASKS} from "../../constants";
import {getTempConfig} from "../../services/config";

interface QueueNode {
  id: string;
  resolver: (ctn: boolean) => void;
}

const abstractPool: AbstractPoolNode[] = [],
  runningQueue: QueueNode[] = [],
  suspendedQueue: QueueNode[] = [];

type TaskType = TaskState["type"];

// 实时全局状态
const globalTaskState: Record<TaskType, number> = {
  completed: 0,
  downloading: 0,
  error: 0,
  paused: 0,
  queuing: 0,
  validating: 0,
};

function updateGlobalTaskState(next?: TaskType, prev?: TaskType) {
  if (next) {
    globalTaskState[next] = globalTaskState[next] + 1;
  }
  if (prev) {
    globalTaskState[prev] = globalTaskState[prev] - 1;
  }
  scheduleQueue();
}

// 排队
async function queue(taskId: string): Promise<boolean> {
  return new Promise((resolve) => {
    runningQueue.push({
      id: taskId,
      resolver: resolve,
    });
    scheduleQueue();
  });
}

// 暂停队列中节点排队
function suspendQueue(taskId: string) {
  for (let i = 0; i < runningQueue.length; i++) {
    const node = runningQueue[i];
    if (node.id == taskId) {
      runningQueue.splice(i, 1);
      suspendedQueue.push(node);
      return;
    }
  }
  log(
    `Error:Fatal:Can't suspend queue node ${taskId} : not found in running queue`
  );
}

// 恢复队列中节点排队
function resumeQueue(taskId: string) {
  for (let i = 0; i < suspendedQueue.length; i++) {
    const node = suspendedQueue[i];
    if (node.id == taskId) {
      suspendedQueue.slice(i, 1);
      runningQueue.push(node);
      return;
    }
  }
  log(
    `Error:Fatal:Can't resume queue node ${taskId} : not found in suspended queue`
  );
}

// 取消队列中节点排队
function cancelQueue(taskId: string) {
  for (let i = 0; i < runningQueue.length; i++) {
    const node = runningQueue[i];
    if (node.id == taskId) {
      runningQueue.splice(i, 1);
      node.resolver(false);
      return;
    }
  }
  for (let i = 0; i < suspendedQueue.length; i++) {
    const node = suspendedQueue[i];
    if (node.id == taskId) {
      suspendedQueue.slice(i, 1);
      node.resolver(false);
      return;
    }
  }
  log(`Error:Fatal:Can't cancel queue node ${taskId} : not found`);
}

// 叫号调度
function scheduleQueue() {
  // 获取临时配置文件
  const cfg = getTempConfig();
  // 计算空闲位置
  const maxSeats = Math.min(
    MAX_DOWNLOADING_TASKS,
    cfg.download.maxDownloadingTasks
  );
  const availableSeats = maxSeats - globalTaskState.downloading;

  if (availableSeats > 0) {
    // 按队列顺序叫号
    for (let i = 0; i < availableSeats; i++) {
      const node = runningQueue.shift();
      if (node != null) {
        node.resolver(true);
      } else {
        break;
      }
    }
  }
}

// Pool 操作封装
function add(id: string, state: TaskState, meta: TaskMeta) {
  abstractPool.push({
    id,
    state: state,
    meta,
  });
  updateGlobalTaskState(state.type);
}

function update(id: string, nextState: TaskState) {
  for (const node of abstractPool) {
    if (node.id == id) {
      const prevType = node.state.type,
        nextType = nextState.type;
      if (prevType != nextType) {
        updateGlobalTaskState(nextType, prevType);
      }
      node.state = nextState;
      return;
    }
  }
  log(
    `Error:Fatal:Can't update abstract download pool node : Task ${id} not found`
  );
}

function remove(id: string) {
  for (let i = 0; i < abstractPool.length; i++) {
    const node = abstractPool[i];
    if (node.id == id) {
      updateGlobalTaskState(undefined, node.state.type);
      abstractPool.splice(i, 1);
      return;
    }
  }
  log(
    `Error:Fatal:Can't remove abstract download pool node : Task ${id} not found`
  );
}

function list() {
  return abstractPool;
}

export default {
  add,
  update,
  remove,
  list,
  queue,
  suspendQueue,
  resumeQueue,
  cancelQueue,
};
