import {log} from "../../log";
import {TaskProgressNotification} from "../../../../types/module";

interface State {
  type: "running" | "completed" | "error";
  payload: TaskProgressNotification | string | null;
}

type Listener = (state: State) => void;

class StateMachine {
  state: State;
  private listeners: Listener[];

  constructor() {
    this.state = {
      type: "running",
      payload: null,
    };
    this.listeners = [];
  }

  listen(listener: Listener) {
    this.listeners.push(listener);
  }

  toRunning(payload: TaskProgressNotification) {
    this.switchState({
      type: "running",
      payload,
    });
  }

  toCompleted() {
    this.switchState({
      type: "completed",
      payload: null,
    });
  }

  toError(msg: string) {
    this.switchState({
      type: "error",
      payload: msg,
    });
  }

  private switchState(next: State) {
    if (this.state.type != "running") {
      log(
        `Warning:Illegal state switch to ${JSON.stringify(
          next
        )} : current state is ${this.state.type}`
      );
      return;
    }
    this.state = next;
    this.listeners.forEach((listener) => {
      listener(next);
    });
  }
}

export { StateMachine };
