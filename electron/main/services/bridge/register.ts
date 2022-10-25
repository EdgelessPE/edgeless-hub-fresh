import {innerLog} from "../../log";
import {getLocalImageSrc} from "../../utils";
import {Observable} from "rxjs";
import {
  getObservableConfig,
  modifyObservableConfig,
  patchObservableConfig,
  resetObservableConfig,
  setObservableConfig,
} from "../config";
import {Err, Ok, Result} from "ts-results";
import {InitError} from "../../../../types";
import {closeWindow, restartWindow, toggleDevTool} from "../../index";
import {createTask} from "../download";
import {continueTask, pauseTask, removeTask} from "../download/pool";

function getMethodRegister(): Record<string, (...args: any) => any> {
  return {
    closeWindow,
    restartWindow,
    toggleDevTool,
    innerLog,
    getLocalImageSrc,
    setObservableConfig,
    patchObservableConfig,
    modifyObservableConfig,
    resetObservableConfig,
    createTask,
    removeTask,
    pauseTask,
    continueTask,
  };
}

async function getObservableRegistry(): Promise<
  Result<Record<string, Observable<any>>, InitError>
> {
  const register: Record<string, Observable<any>> = {};

  // config
  const configRes = await getObservableConfig();
  if (configRes.err)
    return new Err({
      type: "Config",
      msg: configRes.val,
    });
  register.config = configRes.unwrap();

  return new Ok(register);
}

export { getMethodRegister, getObservableRegistry };
