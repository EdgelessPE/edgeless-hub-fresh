import { Module } from "../Module";
import { Res } from "../../type";
import { copyFile, ProgressData } from "cp-file";
import { StateMachine } from "./StateMachine";
import { log } from "../../log";
import { Err, Ok } from "ts-results";
import * as fs from "fs";
import * as path from "path";
import { del } from "../../utils/shell";

interface InstallPackageParams {
  sourceFilePath: string;
  targetFilePath: string;
}

interface ProgressUpdate {
  time: number;
  writtenSize: number;
}

type Listener = (
  type: string,
  payload: unknown,
  allowedCommands: string[]
) => void;

class InstallPackage extends Module {
  private readonly params: InstallPackageParams;
  private stateMachine: StateMachine;
  private recent: ProgressUpdate;

  constructor(params: InstallPackageParams) {
    super();
    this.params = params;
    this.stateMachine = new StateMachine();
    this.recent = {
      time: Date.now(),
      writtenSize: 0,
    };
  }

  listen(listener: Listener) {
    // 直接构造适配器函数添加到状态机的监听器数组中
    this.stateMachine.listen((state) => {
      listener(state.type, state.payload, []);
    });
  }

  async start(): Promise<Res<null>> {
    const { sourceFilePath, targetFilePath } = this.params;
    // 检查入参是否正确
    if (!fs.existsSync(sourceFilePath)) {
      const msg = `Error:Fatal:Source file not exist : ${sourceFilePath}`;
      this.stateMachine.toError(msg);
      return new Err(msg);
    }
    const targetDir = path.dirname(targetFilePath);
    if (!fs.existsSync(targetDir)) {
      const msg = `Error:Fatal:Target dir not exist : ${targetDir}`;
      this.stateMachine.toError(msg);
      return new Err(msg);
    }
    // TODO:检查目标驱动器剩余空间

    // 执行拷贝
    const onProgress = (progress: ProgressData) => {
      const current: ProgressUpdate = {
        time: Date.now(),
        writtenSize: progress.writtenBytes,
      };
      if (current.time - this.recent.time < 1000) return;
      this.stateMachine.toRunning({
        percent: progress.percent * 100,
        speed: calcSpeed(this.recent, current),
      });
      this.recent = current;
    };
    await copyFile(sourceFilePath, targetFilePath, {
      onProgress,
    });

    // 校验文件是否存在
    if (!fs.existsSync(targetFilePath)) {
      const msg = `Error:Can't install package from ${sourceFilePath} to ${targetFilePath} : file not exist after copy`;
      this.stateMachine.toError(msg);
      return new Err(msg);
    }

    this.stateMachine.toCompleted();
    return new Ok(null);
  }

  async command(cmd: string, payload: unknown): Promise<Res<null>> {
    return new Err(
      `Error:Fatal:No commands allowed in Install Package module : received ${cmd} with payload ${payload}`
    );
  }

  async cancel(): Promise<Res<null>> {
    // 如果任务正在进行中则拒绝取消
    if (this.stateMachine.state.type == "running") {
      return new Err(
        `Error:Can't cancel Install Package module now : copying file is running and please wait until copying finished, otherwise your drive may be damaged!`
      );
    }
    // 删除已拷贝的文件
    if (!del(this.params.targetFilePath)) {
      log(
        `Warning:Can't delete target file before cancel Install Package module : ${this.params.targetFilePath}`
      );
    }

    return new Ok(null);
  }
}

function calcSpeed(recent: ProgressUpdate, current: ProgressUpdate) {
  const timePassedMilliSecond = current.time - recent.time;
  const sizeFinishedByte = current.writtenSize - recent.writtenSize;
  return (sizeFinishedByte / timePassedMilliSecond) * 1000;
}

export { InstallPackageParams, InstallPackage };
