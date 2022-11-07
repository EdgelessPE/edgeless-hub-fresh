import { ARes } from "../../../type";
import { TaskProgressNotification } from "../type";

interface ProviderParams {
  url: string;
  fileName: string;
  dir: string;
  totalSize: number;
}

type TaskProgressListener = (notification: TaskProgressNotification) => void;

abstract class Provider {
  // 是否支持暂停 flag
  allowPause: boolean;
  // 下载参数
  protected params: ProviderParams;
  // 上层的进度监听器
  protected listener: TaskProgressListener;

  // 类构造器
  protected constructor(
    params: ProviderParams,
    listener: TaskProgressListener
  ) {
    this.params = params;
    this.allowPause = false;
    this.listener = listener;
  }

  // 引擎初始化
  abstract init(): ARes<null>;

  // 开始任务，到达终态状态（Completed 或 Error）时 resolve
  abstract start(): ARes<null>;

  // 移除任务，不允许删除文件
  abstract remove(): ARes<null>;
}

abstract class InterruptableProvider extends Provider {
  // 类构造器
  protected constructor(
    params: ProviderParams,
    listener: TaskProgressListener
  ) {
    super(params, listener);
    this.allowPause = true;
  }

  // 暂停任务
  abstract pause(): ARes<null>;

  // 继续任务
  abstract continue(): ARes<null>;
}

export {
  Provider,
  InterruptableProvider,
  ProviderParams,
  TaskProgressListener,
};
