import {EventEmitter} from "node:events";
import {AddTaskEventPayload, PoolMapNode, PoolStatus} from "./type";
import {TaskProgressNotification} from "./provider/type";
import {log} from "../../log";

const eventBus = new EventEmitter();

function registerEventBus(map: Map<string, PoolMapNode>, updateCallback: (id: string) => void) {
  // map 状态更新封装
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
        updateCallback(id)
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
        updateCallback(id)
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
        updateCallback(id)
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
        updateCallback(id)
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
        updateCallback(id)
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
        updateCallback(id)
      },
    },
    {
      statusName: "add", // 任务状态机创建事件
      handler: (id: string, payload: AddTaskEventPayload) => {
        const {provider, params, returned} = payload;
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
        updateCallback(id)
      },
    },
  ];
  eventHandlers.forEach((node) => {
    eventBus.on(node.statusName, node.handler);
  });
}

function emitDownloading(id: string, payload: TaskProgressNotification) {
  eventBus.emit("downloading", id, payload)
}

function emitValidating(id: string) {
  eventBus.emit("validating", id)
}

function emitError(id: string, payload: string) {
  eventBus.emit("error", id, payload)
}

function emitCompleted(id: string) {
  eventBus.emit("completed", id)
}

function emitPaused(id: string) {
  eventBus.emit("paused", id)
}

function emitPending(id: string) {
  eventBus.emit("pending", id)
}

function createTaskNode(id: string, payload: AddTaskEventPayload) {
  eventBus.emit("add", id, payload)
}

export {
  registerEventBus,
  emitValidating,
  emitCompleted,
  emitDownloading,
  emitError,
  emitPaused,
  emitPending,
  createTaskNode
}
