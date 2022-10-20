import {getProvider} from "./_register";
import {Result} from "ts-results";
import {modifyObservableConfig} from "../../config";

async function setProvider(id: string): Promise<Result<null, string>> {
  const searchRes = getProvider(id);
  if (searchRes.err) {
    return searchRes;
  }

  return modifyObservableConfig((rawConfig) => {
    const cfg = rawConfig;
    cfg.download.provider = id;
    return cfg;
  });
}

export {setProvider};
