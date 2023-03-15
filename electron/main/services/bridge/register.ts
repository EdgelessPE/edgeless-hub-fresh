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
import {
  closeWindow,
  getVersion,
  restartWindow,
  toggleDevTool,
} from "../../index";
import {
  addMultiSequence,
  hasActiveSingleSequence,
  removeMultiSequence,
  resetMultiSequence,
  startSingleSequence,
  viewMultiSequences,
} from "../../sequences/rendererAdapter";
import { getAlpha, getHello } from "../ept/cache";
import { eptInstall } from "../ept";
import {
  addMirror,
  infoMirror,
  listMirror,
  removeMirror,
  setMirror,
} from "../ept/mirror";
import { genTaskStatus } from "../../sequences/adapter";
import { getAbstractPoolSubject } from "../../modules/download/abstractPool";

function getMethodRegister(): Record<string, (...args: unknown[]) => unknown> {
  return {
    closeWindow,
    restartWindow,
    toggleDevTool,
    innerLog,
    getLocalImageSrc,
    getVersion,

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
    genTaskStatus,

    getHello,
    getAlpha,
    eptInstall,
    addMirror,
    setMirror,
    removeMirror,
    infoMirror,
    listMirror,
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

  // download abstract pool
  register.downloadAbstractPool = getAbstractPoolSubject();

  return new Ok(register);
}

export { getMethodRegister, getObservableRegistry };
