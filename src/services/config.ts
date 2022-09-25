import { createBridgeSubject } from "@/bridge/observable";
import { Config } from "../../types/config";
import { Result } from "ts-results";
import { useState } from "react";
import bridge from "@/bridge/method";

let cfg: Config | null = null;

const subject = createBridgeSubject<Result<Config, string>>("config");
subject.subscribe((result) => {
  if (result.ok) {
    cfg = result.val;
  }
});

function useConfig(): Config {
  const [config, setConfig] = useState(cfg!);
  subject.subscribe((result) => {
    if (result.ok) {
      setConfig(result.val);
    }
  });
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

export { useConfig, setConfig, modifyConfig, patchConfig };
