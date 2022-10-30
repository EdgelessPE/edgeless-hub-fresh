import {StateMachine} from "./StateMachine";
import {Err, Ok, Result} from "ts-results";
import {ProviderHandler} from "./provider/type";
import {Module, StateMachineChangeEvent} from "../model/Module";
import AbstractPool from "./abstractPool";
import {TaskState} from "./type";

class DownloadModule extends Module {
  id: string
  stateMachine: StateMachine
  targetPosition: string
  handler: ProviderHandler


  constructor(id: string, targetPosition: string, stateMachine: StateMachine, taskHandler: ProviderHandler) {
    super();
    this.id = id
    this.stateMachine = stateMachine
    this.targetPosition = targetPosition
    this.handler = taskHandler
  }

  allowPause() {
    return this.handler.pause != null
  }

  async pause(): Promise<Result<null, string>> {
    if (!this.allowPause()) {
      return new Err(`Error:Fatal:Task ${this.id} doesn't allow pause`)
    }
    return this.handler!.pause()
  }

  async continue(): Promise<Result<null, string>> {
    if (!this.allowPause()) {
      return new Err(`Error:Fatal:Task ${this.id} doesn't allow pause but continue fn was called`)
    }
    return this.handler!.continue()
  }

  async remove(removeFile: boolean): Promise<Result<null, string>> {
    const curType = this.stateMachine.state.type
    // 如果任务正在进行则尝试进行暂停
    if (curType == "downloading") {
      if (this.allowPause()) {
        const pRes = await this.handler.pause()
        if (pRes.err) {
          return new Err(`Error:Can't remove task, caused by can't pause task before removal : ${pRes.val}`)
        }
      }
    }
    // 检查当前状态是否允许被移除
    const allowedStates: TaskState['type'][] = [
      "error",
      "completed",
      "paused",
      "downloading"
    ]
    if (!allowedStates.includes(curType)) {
      return new Err(`Error:Can't remove task at state ${curType}`)
    }

    // 如果存在把手则向把手发出移除请求
    if (this.handler) {
      const hRes = await this.handler.remove()
      if (hRes.err) return hRes
    }

    // 从共享抽象池删除任务
    AbstractPool.remove(this.id)
    return new Ok(null)
  }


  listen(listener: (event: StateMachineChangeEvent) => void) {
    this.stateMachine.listen(listener)
  }

}
