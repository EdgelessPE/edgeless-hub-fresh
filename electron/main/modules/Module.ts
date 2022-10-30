import {Result} from "ts-results";

abstract class Module {
  abstract start(): Promise<Result<any, string>>

  abstract listen(listener: (type: string, payload: any, allowedCommands: string[]) => void)

  abstract command(cmd: string, payload: any): Promise<Result<any, string>>
}


export {
  Module,
}
