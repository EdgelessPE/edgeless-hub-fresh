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

  toPaused() {
    this.switchState({
      type: "paused",
      payload: null
    })
  }

  listen(listener: Listener) {
    this.listeners.push(listener)
  }

  private switchState(next: TaskState) {
    log(`Debug:Switch download task ${this.id} state from ${this.state.type} to ${next.type}`)
    this.state = next
    this.listeners.forEach(listener => {
      listener(next)
    })
  }
}

export {
  StateMachine
}
