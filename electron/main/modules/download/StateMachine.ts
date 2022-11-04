import {TaskProgressNotification, TaskState} from "./type";
import {log} from "../../log";

type Listener = (state: TaskState) => void

class StateMachine {
  id: string
  state: TaskState
  private listeners: Listener[]

  constructor(id: string) {
    this.id = id
    this.state = {
      type: "queuing",
      payload: null
    }
  }

  toQueuing() {
    this.switchState({
      type: "queuing",
      payload: null
    })
  }

  toDownloading(payload: TaskProgressNotification) {
    this.switchState({
      type: "downloading",
      payload
    })
  }

  toValidating() {
    this.switchState({
      type: "validating",
      payload: null
    })
  }

  toCompleted() {
    this.switchState({
      type: "completed",
      payload: null
    })
  }

  toError(msg: string) {
    this.switchState({
      type: "error",
      payload: msg
    })
  }

  toPaused(fromType: "queuing" | "downloading") {
    this.switchState({
      type: "paused",
      payload: fromType
    })
  }

  listen(listener: Listener) {
    this.listeners.push(listener)
  }

  removeListeners() {
    this.listeners = []
  }

  private switchState(next: TaskState) {
    const {type} = this.state
    // 终态限制跳转检测
    if (type == "completed" || type == "error") {
      log(`Warning:Illegal state switch to ${JSON.stringify(next)} : current state is ${type}`)
      return
    }

    log(`Debug:Switch download task ${this.id} state from ${type} to ${next.type}`)
    this.state = next
    this.listeners.forEach(listener => {
      listener(next)
    })
  }
}

export {
  StateMachine
}
