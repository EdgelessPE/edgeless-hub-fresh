import {ARes} from "../type";

abstract class Module {
  // 接收上层传入的监听器
  abstract listen(
    listener: (type: string, payload: any, allowedCommands: string[]) => void
  );

  // 开始执行模块
  abstract start(): ARes<any>;

  // 接收执行过程中的命令
  abstract command(cmd: string, payload: any): ARes<any>;

  // 取消执行任务
  abstract cancel(): ARes<null>;
}

export { Module };
