import { innerLog } from "../../log";
import { getLocalImageSrc } from "../../utils";
import { Observable } from "rxjs";
import {
  getObservableConfig,
  modifyObservableConfig,
  patchObservableConfig,
  resetObservableConfig,
  setObservableConfig,
} from "../config";
import { Err, Ok, Result } from "ts-results";
import { InitError } from "../../../../types";
import { closeWindow, restartWindow, toggleDevTool } from "../../index";
import {
  addMultiSequence,
  hasActiveSingleSequence,
  removeMultiSequence,
  resetMultiSequence,
  startSingleSequence,
  viewMultiSequences,
} from "../../sequences/rendererAdapter";

function getMethodRegister(): Record<string, (...args: unknown[]) => unknown> {
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

    hasActiveSingleSequence,
    startSingleSequence,
    viewMultiSequences,
    addMultiSequence,
    removeMultiSequence,
    resetMultiSequence,
  };
}

async function getObservableRegistry(): Promise<
  Result<Record<string, Observable<unknown>>, InitError>
> {
  const register: Record<string, Observable<unknown>> = {};

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
