import {Observable} from "rxjs";
import {TaskProgressNotification} from "./provider/type";
import {EventEmitter} from "node:events";
import {log} from "../../log";
import {AddTaskEventPayload, PoolMapNode, PoolStatus} from "./type";
import {Err, Result} from "ts-results";

const eventBus = new EventEmitter();
const map = new Map<string, PoolMapNode>();

function setMap(id: string, status: PoolStatus) {
  if (!map.has(id)) {
    log(
      `Error:Fatal:Download task ${id} should exist before status ${status.type} update`
    );
    return false;
  }
  const entry = map.get(id)!;
  // 记录日志
  const logTitle = status.type == "error" ? "Error" : "Info";
  log(
    `${logTitle}:Switch task ${id} status from ${entry.status.type} to ${
      status.type
    } with payload : ${JSON.stringify(status.payload)}`
  );

  // 更新 map
  entry.status = status;
  map.set(id, entry);

  return true;
}

function getRendererObservable() {
  //TODO:完善rendererView生成和发送
  const rendererView = [];
  return new Observable((subscriber) => {
    // event bus 事件统一处理
    const eventHandlers = [
      {
        statusName: "downloading",
        handler: (id: string, payload: TaskProgressNotification) => {
          if (
            !setMap(id, {
              type: "downloading",
              payload,
            })
          )
            return;
        },
      },
      {
        statusName: "validating",
        handler: (id: string) => {
          if (
            !setMap(id, {
              type: "validating",
              payload: null,
            })
          )
            return;
        },
      },
      {
        statusName: "error",
        handler: (id: string, payload: string) => {
          if (
            !setMap(id, {
              type: "error",
              payload,
            })
          )
            return;
        },
      },
      {
        statusName: "completed",
        handler: (id: string) => {
          if (
            !setMap(id, {
              type: "completed",
              payload: null,
            })
          )
            return;
        },
      },
      {
        statusName: "paused",
        handler: (id: string) => {
          if (
            !setMap(id, {
              type: "paused",
              payload: null,
            })
          )
            return;
        },
      },
      {
        statusName: "pending",
        handler: (id: string) => {
          if (
            !setMap(id, {
              type: "pending",
              payload: null,
            })
          )
            return;
        },
      },
      {
        statusName: "add",
        handler: (id: string, payload: AddTaskEventPayload) => {
          const { provider, params, returned } = payload;
          const mapNode: PoolMapNode = {
            provider,
            params,
            returned,
            status: {
              type: "pending",
              payload: null,
            },
          };
          log(`Info:Add task with map node : ${JSON.stringify(mapNode)}`);
          map.set(id, mapNode);
        },
      },
    ];
    eventHandlers.forEach((node) => {
      eventBus.on(node.statusName, node.handler);
    });
  });
}

async function pauseTask(id: string): Promise<Result<null, string>> {
  // 获取任务入口
  if (!map.has(id)) {
    return new Err(`Error:Can't find task ${id}`)
  }
  const entry = map.get(id)!
  // 检查任务是否支持暂停
  if (entry.returned.handler == null) {
    return new Err(`Error:Task ${id} used download provider ${entry.provider} which doesn't support pausing`)
  }
  // 仅当当前状态机为 downloading 时允许暂停
  if (entry.status.type != "downloading") {
    return new Err(`Error:Task ${id} current status ${entry.status.type} doesn't support pausing`)
  }

  // 通过把手进行暂停
  return entry.returned.handler.pause()
}

async function continueTask(id: string): Promise<Result<null, string>> {
  if (!map.has(id)) {
    return new Err(`Error:Can't find task ${id}`)
  }
  const entry = map.get(id)!

  if (entry.returned.handler == null) {
    return new Err(`Error:Task ${id} used download provider ${entry.provider} which doesn't support continuation`)
  }
  if (entry.status.type != "paused") {
    return new Err(`Error:Task ${id} current status ${entry.status.type} doesn't require continuation`)
  }

  return entry.returned.handler.continue()
}

export {
  eventBus,
  getRendererObservable,
  pauseTask,
  continueTask,
};
