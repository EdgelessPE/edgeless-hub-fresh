import { Observable } from "rxjs";
import { TaskProgressNotification } from "./provider/type";
import { EventEmitter } from "node:events";
import { log } from "../../log";
import { AddTaskEventPayload, PoolMapNode, PoolStatus } from "./type";

const eventBus = new EventEmitter();
const map = new Map<string, PoolMapNode>();

function setMap(id: string, status: PoolStatus) {
  if (!map.has(id)) {
    log(
      `Error:Fatal:Download task ${id} should exist before status ${status.type} update`
    );
    return false;
  }
  // 记录日志
  const logTitle = status.type == "error" ? "Error" : "Info";
  log(
    `${logTitle}:Switch task ${id} to status ${
      status.type
    } with payload : ${JSON.stringify(status.payload)}`
  );

  // 更新 map
  const entry = map.get(id)!;
  entry.status = status;
  map.set(id, entry);

  return true;
}

export function getRendererObservable() {
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
        handler: (id: string, payload: TaskProgressNotification) => {
          if (
            !setMap(id, {
              type: "validating",
              payload,
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

export default {
  eventBus,
  map,
};
