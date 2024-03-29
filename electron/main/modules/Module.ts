import { ARes } from "../type";

type ModuleListener = (
  type: string,
  payload: unknown,
  allowedCommands: string[]
) => void;

abstract class Module {
  // 接收上层传入的监听器
  abstract listen(listener: ModuleListener): void;

  // 开始执行模块
  abstract start(): ARes<unknown>;

  // 接收执行过程中的命令
  abstract command(cmd: string, payload: unknown): ARes<unknown>;

  // 取消执行任务
  abstract cancel(): ARes<null>;
}

export { Module, ModuleListener };
