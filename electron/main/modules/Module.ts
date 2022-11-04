import {ARes} from "../type";

abstract class Module {
  abstract start(): ARes<any>

  abstract listen(listener: (type: string, payload: any, allowedCommands: string[]) => void)

  abstract command(cmd: string, payload: any): ARes<any>

  abstract cancel(): ARes<null>
}


export {
  Module,
}
