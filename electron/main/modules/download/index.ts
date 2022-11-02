import {Module} from "../Module";
import {Result} from "ts-results";

class Download extends Module {
  constructor() {
    super();

  }

  start(): Promise<Result<any, string>> {
    return Promise.resolve(undefined);
  }

  command(cmd: string, payload: any): Promise<Result<any, string>> {
    return Promise.resolve(undefined);
  }

  listen(listener: (type: string, payload: any, allowedCommands: string[]) => void) {
  }

}
