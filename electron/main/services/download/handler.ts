import {StateMachine} from "./StateMachine";
import {Result} from "ts-results";

class DownloadTaskHandler {
  id: string
  stateMachine: StateMachine
  allowPause: boolean

  constructor(id: string, stateMachine: StateMachine, allowPause: boolean) {
    this.id = id
    this.stateMachine = stateMachine
    this.allowPause = allowPause
  }

  async pause(): Promise<Result<null, string>> {

  }

  async continue(): Promise<Result<null, string>> {

  }

  async remove(removeFile: boolean): Promise<Result<null, string>> {

  }

  onChange(callback: () => void) {

  }
}
