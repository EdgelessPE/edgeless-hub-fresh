import { Err, Ok, Result } from "ts-results";
import { Res } from "../type";
import { Module } from "../modules/Module";
import { log } from "../log";

interface SeqNode<U> {
  name: string;
  userInputValidator?: (userInput: U) => Result<U | null, string>; // 用户输入校验器和适配器，可以拒绝用户输入或对用户输入进行修改
  moduleInputAdapter: (userInput: U, prevReturned: unknown[]) => unknown; // 模块输入适配器，输入用户输入和上一模块的返回内容，输出当前模块需要的入参
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moduleConstructor: any;
}

interface Current {
  name: string;
  stepIndex: number;
  state: State;
  allowedCommands: string[];
}

interface State {
  type: string;
  payload: unknown;
}

type Listener = (cur: Current) => void;

class Sequence<U> {
  private readonly seq: SeqNode<U>[]; // 序列构造输入
  private userInput: U; // 用户输入
  private current: Current | null; // 当前状态信息
  private currentListeners: Listener[]; // 当前状态信息的上层监听器
  private moduleInstance: Module | null; // 当前步骤所使用的模块实例
  private readonly prevOutput: unknown[]; // 存放上一模块输出

  constructor(seq: SeqNode<U>[], userInput: U) {
    this.seq = seq;
    this.userInput = userInput;
    this.current = null;
    this.currentListeners = [];
    this.moduleInstance = null;
    this.prevOutput = [];
  }

  /**
   * 开始执行序列
   * @return 最后一个模块的输出
   */
  async start(): Promise<Res<unknown[]>> {
    // 执行步骤校验器
    for (const seqNode of this.seq) {
      if (seqNode.userInputValidator) {
        const vRes = seqNode.userInputValidator(this.userInput);
        if (vRes.err) {
          const msg = `Error:Fatal:User input validation failed at step ${seqNode.name} : ${vRes.val}`;
          log(msg);
          return new Err(msg);
        }
        const r = vRes.unwrap();
        if (r != null) {
          this.userInput = r;
        }
      }
    }
    // 计算开始时的序列断点
    let stepIndex = this.current?.stepIndex ?? 0;
    log(
      `Info:Start sequence from seq index ${stepIndex}/${
        this.seq.length
      } with userInput : ${JSON.stringify(this.userInput)}`
    );

    // 迭代序列节点
    for (; stepIndex < this.seq.length; stepIndex++) {
      const seqNode = this.seq[stepIndex];

      // 生成模块入参
      let inputParams;
      try {
        inputParams = seqNode.moduleInputAdapter(
          this.userInput,
          this.prevOutput
        );
      } catch (e) {
        return new Err(
          `Error:Fatal:Can't apply input adapter for step ${
            seqNode.name
          } : ${JSON.stringify(e)}`
        );
      }
      log(
        `Debug:Prepare step "${
          seqNode.name
        }" at index ${stepIndex} with input params = ${JSON.stringify(
          inputParams
        )}`
      );

      // 实例化模块
      const moduleInstance: Module = new seqNode.moduleConstructor(inputParams);
      this.moduleInstance = moduleInstance;

      // 不通知监听器地重置 current
      this.current = null;

      // 监听模块状态变更
      moduleInstance.listen((type, payload, allowedCommands) => {
        // 检查当前监听回调更新是否对应正在执行中的模块
        if (this.current != null && this.current.name != seqNode.name) {
          log(
            `Debug:Warning:Trying to update a wrong state, current state = ${
              this.current.name
            }, seq name = ${
              seqNode.name
            }; Received type = ${type}, payload = ${JSON.stringify(payload)}`
          );
          return;
        }

        // 更新 current
        const current = {
          name: seqNode.name,
          stepIndex,
          state: {
            type,
            payload,
          },
          allowedCommands,
        };
        this.updateCurrent(current);
        log(`Debug:Update sequence current state : ${JSON.stringify(current)}`);
      });

      // 开始执行模块
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let outputRes: any;
      try {
        outputRes = await moduleInstance.start();
      } catch (e) {
        const errMsg = JSON.stringify(e);
        this.updateCurrent({
          name: seqNode.name,
          stepIndex,
          state: {
            type: "error",
            payload: errMsg,
          },
          allowedCommands: [],
        });
        return new Err(
          `Error:Module ${this.current.name} thrown with error : ${errMsg}`
        );
      }

      // 判断模块终态
      const finalType = this.current.state.type;
      if (finalType == "error" || outputRes.err) {
        // 立即返回错误
        return new Err(
          `Error:Sequence stopped at step ${
            this.current.name
          } with state ${finalType}, payload : ${
            this.current.state.payload
          }, resolved value : ${JSON.stringify(outputRes)}`
        );
      } else if (finalType == "completed") {
        // 继续下一个步骤循环
        const output = outputRes.unwrap();
        this.prevOutput.push(output);
        log(
          `Debug:Go to next seq node with previous output = ${JSON.stringify(
            output
          )}`
        );
      } else {
        return new Err(
          `Error:Sequence abnormal : module ${
            this.current.name
          } didn't stop at final state, current=${JSON.stringify(this.current)}`
        );
      }
    }

    return new Ok(this.prevOutput);
  }

  async command(cmd: string, payload: unknown): Promise<Res<unknown>> {
    // 检查命令是否被允许
    if (!this.current.allowedCommands.includes(cmd)) {
      return new Err(
        `Error:Command ${cmd} is not allowed at step ${this.current.name}`
      );
    }

    log(
      `Info:Response to command ${cmd} with payload : ${JSON.stringify(
        payload
      )}`
    );

    // 转发模块命令至模块实例
    return this.moduleInstance.command(cmd, payload);
  }

  async cancel(): Promise<Res<null>> {
    log(`Info:Cancel step ${this.current.name}`);
    return this.moduleInstance.cancel();
  }

  // 重试当前步骤并返回一个新的 start() 调用
  // 另外在序列管理器层级提供另一个 retry 方法用于重试整条序列
  async retryCurrentStep(): Promise<Res<unknown>> {
    // 取消当前步骤执行
    const mcRes = await this.moduleInstance.cancel();
    if (mcRes.err) {
      log(
        `Warning:Cancel step ${this.current.name} before retry error : ${mcRes.val}`
      );
    }

    // 重新开始（从断点恢复）
    log(`Info:Restart current step : ${this.current.name}`);
    return this.start();
  }

  private updateCurrent(cur: Current) {
    this.current = cur;
    this.currentListeners.forEach((listener) => {
      listener(cur);
    });
  }

  getCurrent(): Current | null {
    return this.current;
  }

  listenCurrent(listener: Listener) {
    this.currentListeners.push(listener);
  }

  removeListeners() {
    this.currentListeners = [];
  }
}

export { Sequence, SeqNode, Current };
