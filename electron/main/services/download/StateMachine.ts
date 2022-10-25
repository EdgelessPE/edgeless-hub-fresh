import {TaskMeta, TaskState} from "./type";
import {TaskProgressNotification} from "./provider/type";

class StateMachine {
  id: string
  state: TaskState
  meta: TaskMeta

  constructor(id: string, meta: TaskMeta, initialState: "queuing" | "completed") {
    this.id = id
    this.meta = meta
    this.state = {
      type: initialState,
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

  private switchState(next: TaskState) {
    console.log(`Debug:Switch download task ${this.id} state from ${this.state.type} to ${next.type}`)
    this.state = next
  }
}

export {
  StateMachine
}
