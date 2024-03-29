import { Module } from "../Module";
import { Err, Ok } from "ts-results";
import { StateMachine } from "./StateMachine";
import { getTaskId } from "./utils";
import { getTempConfig } from "../../services/config";
import * as path from "path";
import { existUsableFile, getFileSize } from "./cache";
import { TaskMeta, TaskProgressNotification } from "./type";
import { getProviderConstructor } from "./providers/_register";
import { DOWNLOAD_SUB_DIR_PACKAGES } from "../../constants";
import { InterruptableProvider } from "./providers/Provider";
import AbstractPool from "./abstractPool";
import { validateIntegrity } from "../../services/integrity";
import { Res } from "../../type";
import { getAllowedCommands, isAllowedCommand } from "./commands";
import { log } from "../../log";
import { del } from "../../utils/shell";
import type { DownloadParams } from "../../../../types/download";

type Listener = (
  type: string,
  payload: unknown,
  allowedCommands: string[]
) => void;

class Download extends Module {
  // 构造时直接赋值
  private listeners: Listener[];
  private readonly params: DownloadParams;
  private stateMachine: StateMachine;

  // 需要等待 start 被调用才能赋值
  private provider: InterruptableProvider | null;
  private meta: TaskMeta | null;

  constructor(params: DownloadParams) {
    super();
    this.listeners = [];
    this.params = params;
    this.stateMachine = new StateMachine(getTaskId());

    this.provider = null;
    this.meta = null;
  }

  // 上层监听注册
  listen(listener: Listener) {
    this.listeners.push(listener);
  }

  /**
   * @return 下载得到文件的绝对路径
   */
  async start(): Promise<Res<string>> {
    // 解构下载参数和配置参数
    const { url, fileName, totalSize, integrity } = this.params;
    const cfg = getTempConfig();
    const { provider: providerId, cacheDir } = cfg.download;
    const dir = path.join(cacheDir, DOWNLOAD_SUB_DIR_PACKAGES);
    const targetPosition = path.join(dir, fileName);
    this.meta = {
      provider: providerId,
      params: {
        url,
        fileName,
        dir,
        totalSize,
        integrity,
      },
    };

    // 向抽象池添加任务
    AbstractPool.add(this.stateMachine.id, this.stateMachine.state, this.meta);

    // 检查是否存在可用缓存
    const cacheRes = await existUsableFile(
      targetPosition,
      totalSize,
      integrity
    );
    if (cacheRes) {
      // 提前开始监听状态机事件
      this.startListenStateMachine();
      // 更改状态机至已完成状态
      this.stateMachine.toCompleted();
      return new Ok(targetPosition);
    }

    // 实例化 provider
    const pRes = getProviderConstructor(providerId);
    if (pRes.err) {
      // 切换状态机至 error
      this.stateMachine.toError(pRes.val);
      return pRes;
    }
    const providerConstructor = pRes.unwrap();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const provider = new providerConstructor(
      {
        url,
        fileName,
        dir,
        totalSize,
      },
      (notification: TaskProgressNotification) => {
        this.stateMachine.toDownloading(notification);
      }
    );
    this.provider = provider;

    // 初始化 provider
    const initRes = await provider.init();
    if (initRes.err) {
      // 切换状态机至 error
      this.stateMachine.toError(initRes.val);
      return initRes;
    }

    // 开始监听状态机事件
    this.startListenStateMachine(provider.allowPause);

    // 切换状态机至 queuing 状态
    this.stateMachine.toQueuing();

    // 抽象池任务队列排队
    const ctn = await AbstractPool.queue(this.stateMachine.id);

    // 检查是否需要取消执行
    if (!ctn) {
      return new Err(`Error:Task canceled by user`);
    }

    // TODO:检查磁盘剩余空间

    // 不需要跳转状态机至 downloading，由构造 provider 时传入的匿名函数完成

    // 开始并等待下载到达 provider 终态（completed / error）
    const dRes = await provider.start();
    if (dRes.err) {
      // 切换状态机至 error
      this.stateMachine.toError(dRes.val);
      return dRes;
    }

    // 进行校验
    this.stateMachine.toValidating();
    const actualSize = getFileSize(targetPosition);
    if (this.params.totalSize != actualSize) {
      return new Err(
        `Error:Downloaded file size not match : expected ${this.params.totalSize}, got ${actualSize}`
      );
    }
    if (integrity != null) {
      const vRes = await validateIntegrity(targetPosition, integrity);
      if (vRes.err) {
        // 切换状态机至 error
        this.stateMachine.toError(vRes.val);
        return vRes;
      }
    }

    // 完成下载
    this.stateMachine.toCompleted();
    return new Ok(targetPosition);
  }

  async command(cmd: string, payload: unknown): Promise<Res<null>> {
    const { type } = this.stateMachine.state;
    // 检查命令是否合法
    if (!isAllowedCommand(type, this.provider?.allowPause, cmd)) {
      return new Err(
        `Error:Fatal:Illegal command received : ${cmd}, payload : ${payload}`
      );
    }
    // 命令处理分支
    switch (cmd) {
      case "pause":
        return this.pause();
      case "continue":
        return this.continue();
      default:
        return new Err(
          `Error:Fatal:Unknown command received : ${cmd}, payload : ${payload}`
        );
    }
  }

  // 开始监听状态机事件
  private startListenStateMachine(allowPause = false) {
    // 状态机状态变化监听处理
    this.stateMachine.listen((state) => {
      const { type, payload } = state;
      // 通知模块上层监听器
      this.listeners.forEach((listener) => {
        listener(type, payload, getAllowedCommands(type, allowPause));
      });
      // 更新抽象池
      AbstractPool.update(this.stateMachine.id, this.stateMachine.state);
    });
  }

  // 取消任务，只返回成功
  async cancel(): Promise<Res<null>> {
    // 尝试转换状态机至终态或 paused
    const { type } = this.stateMachine.state;
    if (type == "downloading") {
      const pRes = await this.pause();
      if (pRes.err) {
        log(
          `Warning:Can't pause task ${this.stateMachine.id} before cancel : ${pRes.val}`
        );
      }
    }
    if (type == "queuing") {
      // 从抽象池取消排队
      AbstractPool.cancelQueue(this.stateMachine.id);
    }

    // 尝试调用 provider 进行移除
    const rRes = await this.provider?.remove();
    if (rRes.err) {
      log(
        `Warning:Can't remove task ${this.stateMachine.id} through provider ${this.meta?.provider} before cancel : ${rRes.val}`
      );
    }

    // 尝试删除已下载的文件
    const targetPosition = path.join(
      this.meta?.params.dir,
      this.meta?.params.fileName
    );
    if (!del(targetPosition)) {
      log(
        `Warning:Can't delete downloaded file before cancel task ${this.stateMachine.id}`
      );
    }

    // 标记状态机至 error
    this.stateMachine.toError(`Error:Task canceled by user`);

    // 从抽象池删除此任务
    AbstractPool.remove(this.stateMachine.id);

    return new Ok(null);
  }

  private async pause(): Promise<Res<null>> {
    // 根据当前状态分流处理
    const { type } = this.stateMachine.state;
    if (type == "downloading") {
      // 检查 provider 是否支持暂停
      if (!this.provider?.allowPause) {
        return new Err(
          `Error:Fatal:Task ${this.stateMachine.id}'s provider ${this.meta?.provider} doesn't support pause`
        );
      }

      // 立即跳转状态机至已暂停
      this.stateMachine.toPaused(type);

      // 请求 provider 进行暂停
      const pRes = await this.provider?.pause();

      // 处理暂停出错
      if (pRes.err) {
        this.stateMachine.toError(pRes.val);
      }

      return pRes;
    } else if (type == "queuing") {
      // 挂起排队队列
      AbstractPool.suspendQueue(this.stateMachine.id);

      // 跳转状态机至已暂停
      this.stateMachine.toPaused(type);
    }

    return new Err(
      `Error:Can't pause download at state ${this.stateMachine.state.type}`
    );
  }

  private async continue(): Promise<Res<null>> {
    // 根据是否在排队时暂停分类处理
    const fromType = this.stateMachine.state.payload as
      | "downloading"
      | "queuing";
    if (fromType == "downloading") {
      // 检查 provider 是否支持暂停
      if (!this.provider?.allowPause) {
        return new Err(
          `Error:Fatal:Task ${this.stateMachine.id}'s provider ${this.meta?.provider} doesn't support pause`
        );
      }

      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // 切换状态机并提前 resolve
        this.stateMachine.toQueuing();
        resolve(new Ok(null));

        // 抽象池排队
        const ctn = await AbstractPool.queue(this.stateMachine.id);

        // 检查是否需要取消执行
        if (!ctn) {
          return new Err(`Error:Task canceled by user`);
        }

        // 请求 provider 继续
        const cRes = await this.provider?.continue();

        // 处理继续出错
        if (cRes.err) {
          this.stateMachine.toError(cRes.val);
        }

        // 不需要跳转状态机至 downloading，由构造 provider 时传入的匿名函数完成
      });
    } else if (fromType == "queuing") {
      // 继续排队队列
      AbstractPool.resumeQueue(this.stateMachine.id);

      // 跳转状态机至排队中
      this.stateMachine.toQueuing();
    }

    return new Err(
      `Error:Fatal:Can't continue download at state ${this.stateMachine.state.type}`
    );
  }
}

export { DownloadParams, Download };
