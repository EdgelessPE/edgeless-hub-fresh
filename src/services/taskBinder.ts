import { TaskStatus } from "../../types";
import { genTaskStatus, viewMultiSequences } from "@/services/sequence";
import { log } from "@/utils/log";

type Listener = (status: TaskStatus) => void;

interface PoolLocation {
  pool: string;
  id: string;
}

// 用于绑定 池位置key-插件key
const bindMap: Map<string, string> = new Map();
// 用于挂载监听器 插件key-监听器
const listenersMap: Map<string, Listener[]> = new Map();

function getLocationKey(location: PoolLocation) {
  return `${location.pool}_${location.id}`;
}

// 由操作触发者对任务进行绑定更新
function bindTask(pluginKey: string, location: PoolLocation) {
  log(
    `Info:bind location key:${getLocationKey(location)},plugin key:${pluginKey}`
  );
  bindMap.set(getLocationKey(location), pluginKey);
}

// 对任务进行监听
function listenTask(pluginKey: string, listener: Listener) {
  const old = listenersMap.get(pluginKey) ?? [];
  old.push(listener);
  listenersMap.set(pluginKey, old);
}

function unListenTask(pluginKey: string, listener: Listener) {
  const listeners = listenersMap.get(pluginKey);
  if (listeners == null) {
    log(
      `Warning:Trying to unListen a not exist task for plugin : ${pluginKey}`
    );
    return;
  }
  for (let i = 0; i < listeners.length; i++) {
    if (listeners[i] == listener) {
      const newOne = listeners.slice(i, 1);
      listenersMap.set(pluginKey, newOne);
      return;
    }
  }
}

// 观察并行序列池并分发状态更新
async function launchDistributor(msPoolKey: string) {
  const observable = await viewMultiSequences(msPoolKey);
  observable.subscribe(async (value) => {
    for (const node of value) {
      const locationKey = getLocationKey({
        pool: msPoolKey,
        id: node.id,
      });
      const pluginKey = bindMap.get(locationKey);
      if (pluginKey == null) {
        log(`Warning:Location key not registered in bind map : ${locationKey}`);
        return;
      }
      const listeners = listenersMap.get(pluginKey);
      if (listeners == null) {
        // 此时没有渲染监听了此任务的智能按钮，任务在后台运行即可
        return;
      } else {
        const ts = await genTaskStatus(msPoolKey, node);
        listeners.forEach((listener) => {
          listener(ts);
        });
      }
    }
  });
}

// 启动分发器
["addPackage"].forEach(launchDistributor);

export { bindTask, listenTask, unListenTask };
