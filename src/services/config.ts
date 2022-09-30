import { createBridgeSubject } from "@/bridge/observable";
import { Config } from "../../types/config";
import { Result } from "ts-results";
import { useState } from "react";
import bridge from "@/bridge/method";
import { Subject } from "rxjs";
import { configError } from "@/modals/configError";

let cfg: Config | null = null;
let subject: Subject<Result<Config, string> | null> | null = null;
const listeners: Array<(cfg: Config | null) => void> = [];

async function initConfig(modal: any) {
  subject = await createBridgeSubject<Result<Config, string>>("config");
  subject.subscribe((result) => {
    if (result?.ok) {
      cfg = result.val;
      listeners.forEach((listener) => {
        listener(result.val);
      });
    } else {
      listeners.forEach((listener) => {
        listener(null);
      });
      if (result) {
        modal.error(configError(result?.val));
      }
    }
  });
}

function useConfig() {
  const [config, setConfig] = useState(cfg);
  listeners.push(setConfig);
  return config;
}

async function patchConfig<K extends keyof Config>(patchJson: {
  [P in K]: Config[P];
}) {
  return bridge<Result<null, string>>("patchObservableConfig", patchJson);
}

async function modifyConfig(modifier: (rawConfig: Config) => Config) {
  const resultJson = modifier(cfg!);
  return setConfig(resultJson);
}

async function setConfig(resultConfig: Config) {
  return bridge<Result<null, string>>("setObservableConfig", resultConfig);
}

async function resetConfig() {
  return bridge<Result<null, string>>("resetObservableConfig");
}

export {
  initConfig,
  useConfig,
  setConfig,
  modifyConfig,
  patchConfig,
  resetConfig,
};
