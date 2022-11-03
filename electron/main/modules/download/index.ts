import {Module} from "../Module";
import {Ok, Result} from "ts-results";
import {Integrity} from "../../../../types";
import {StateMachine} from "./StateMachine";
import {getTaskId} from "./utils";
import {getTempConfig} from "../../services/config";
import * as path from "path";
import {existUsableFile} from "./cache";
import {TaskState} from "./type";
import {getProviderConstructor} from "./providers/_register";
import {TaskProgressNotification} from "../../services/download/provider/type";
import {DOWNLOAD_SUB_DIR_PACKAGES} from "../../constants";
import {InterruptableProvider} from "./providers/Provider";
import AbstractPool from "./abstractPool";
import {validateIntegrity} from "../../services/integrity";

type Listener = (type: string, payload: any, allowedCommands: string[]) => void
type TaskStateType = TaskState['type']

interface DownloadParams {
  url: string;
  fileName: string;
  totalSize: number;
  integrity?: Integrity;
}

const allowedCommandsMap: Record<TaskStateType, string[]> = {
  queuing: ["pause", "cancel"],
  downloading: ["cancel"],
  validating: ["cancel"],
  completed: [],
  paused: ["continue", "cancel"],
  error: ["retry", "cancel"],
}

function getAllowedCommands(type: TaskStateType, allowPause: boolean): string[] {
  const cmd = allowedCommandsMap[type]
  if (allowPause && type == "downloading") {
    cmd.push("pause")
  }
  return cmd
}

class Download extends Module {
  listeners: Listener[]
  params: DownloadParams
  stateMachine: StateMachine
  provider: InterruptableProvider

  constructor(params: DownloadParams) {
    super();
    this.listeners = []
    this.params = params

    // 创建时立即分配状态机
    this.stateMachine = new StateMachine(getTaskId())
  }

  async start(): Promise<Result<null, string>> {
    // 解构下载参数和配置参数
    const {url, fileName, totalSize, integrity} = this.params
    const cfg = getTempConfig()
    const {provider: providerId, cacheDir, maxDownloadingTasks} = cfg.download
    const dir = path.join(cacheDir, DOWNLOAD_SUB_DIR_PACKAGES)
    const targetPosition = path.join(dir, fileName)

    // 检查是否存在可用缓存
    const cacheRes = await existUsableFile(targetPosition, totalSize, integrity)
    if (cacheRes) {
      // 提前开始监听状态机事件
      this.startListenStateMachine()
      // 更改状态机至已完成状态
      this.stateMachine.toCompleted()
      return new Ok(null)
    }

    // 实例化 provider
    const pRes = getProviderConstructor(providerId)
    if (pRes.err) {
      // 切换状态机至 error
      this.stateMachine.toError(pRes.val)
      return pRes
    }
    const providerConstructor = pRes.unwrap()
    // @ts-ignore
    this.provider = new providerConstructor(
      {
        url,
        fileName,
        dir,
        totalSize
      },
      (notification: TaskProgressNotification) => {
        this.stateMachine.toDownloading(notification)
      }
    )

    // 初始化 provider
    const initRes = await this.provider.init()
    if (initRes.err) {
      // 切换状态机至 error
      this.stateMachine.toError(initRes.val)
      return initRes
    }

    // 开始监听状态机事件
    this.startListenStateMachine(this.provider.allowPause)

    // 切换状态机至 queuing 状态
    this.stateMachine.toQueuing()

    // 抽象池任务队列排队
    await AbstractPool.queue()

    // TODO:检查磁盘剩余空间


    // 开始下载，状态机切换由构造 provider 时传入的匿名函数完成
    const dRes = await this.provider.start()
    if (dRes.err) {
      // 切换状态机至 error
      this.stateMachine.toError(dRes.val)
      return dRes
    }
    this.stateMachine.toValidating()

    // 进行校验
    if (integrity != null) {
      const vRes = await validateIntegrity(targetPosition, integrity)
      if (vRes.err) {
        // 切换状态机至 error
        this.stateMachine.toError(vRes.val)
        return vRes
      }
    }

    // 完成下载
    this.stateMachine.toCompleted()
    return new Ok(null)
  }

  command(cmd: string, payload: any): Promise<Result<any, string>> {
    return Promise.resolve(undefined);
  }

  listen(listener: Listener) {
    this.listeners.push(listener)
  }

  // 开始监听状态机事件
  private startListenStateMachine(allowPause = false) {
    // 状态机状态变化监听处理
    this.stateMachine.listen((state) => {
      const {type, payload} = state
      this.listeners.forEach(listener => {
        listener(type, payload, getAllowedCommands(type, allowPause))
      })
    })
  }

}
