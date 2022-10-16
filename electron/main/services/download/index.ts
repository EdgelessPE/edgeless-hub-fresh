import {
  AddTaskSuggested,
  Provider,
  TaskProgressNotification,
} from "./provider/type";
import { Ok, Result } from "ts-results";
import { Integrity } from "../../../../types";
import Pool from "./pool";
import { Observable } from "rxjs";
import { getTempConfig } from "../config";
import { getProvider } from "./provider";
import { getTaskId } from "./utils";
import { AddTaskEventPayload } from "./type";

const providerReadyMap = new Map<string, Provider>();

async function prepareProvider(id: string): Promise<Result<Provider, string>> {
  // 查询就绪map以返回已初始化的引擎
  if (providerReadyMap.has(id)) return new Ok(providerReadyMap.get(id)!);

  // 或重新获取引擎
  const dpRes = getProvider(id);
  if (dpRes.err) return dpRes;
  const provider = dpRes.unwrap();

  // 初始化引擎
  const initRes = await provider.init();
  if (initRes.err) return initRes;

  // 引擎就绪
  providerReadyMap.set(id, provider);
  return new Ok(provider);
}

// 返回唯一的 task id
async function addTaskProxy(
  url: string,
  fileName: string,
  totalSize: number,
  integrity?: Integrity
): Promise<Result<string, string>> {
  // 读取一份当前配置
  const cfg = getTempConfig();

  // 获取下载引擎
  // 由配置文件获取当前引擎id
  const providerId = cfg.download.provider;
  const pRes = await prepareProvider(providerId);
  if (pRes.err) return pRes;
  const provider = pRes.unwrap();

  // 收集下载参数
  const dir = cfg.download.cacheDir;
  const suggested: AddTaskSuggested = {
    fileName,
    totalSize,
  };

  // 代理订阅引擎事件更新
  const proxyObservable = new Observable<TaskProgressNotification>(
    (subscriber) => {
      provider.addTask(url, dir, suggested, subscriber).then((addRes) => {
        // 添加下载任务
        const taskId = getTaskId(providerId);
        const payload: AddTaskEventPayload = {
          provider: providerId,
          params: {
            url,
            dir,
            suggested: {
              fileName,
              totalSize,
            },
            integrity,
          },
          returned: null,
        };
        if (addRes.ok) {
          const returned = addRes.unwrap();
          payload.returned = returned;
        }
        Pool.eventBus.emit("add", taskId, payload);

        // 如果添加失败，将此任务状态机跳转至 error
        if (addRes.err) {
          const errMsg = addRes.val;
          Pool.eventBus.emit("error", taskId, errMsg);
        }
      });
    }
  );

  proxyObservable.subscribe({
    next(notification) {},
  });
}
