import { Register } from "./_register";
import { Provider } from "./type";
import { Err, Ok, Result } from "ts-results";
import { modifyObservableConfig } from "../../config";
import { DownloadProviderInfo } from "../../../../../types/download";

function getProvider(id: string): Result<Provider, string> {
  for (const provider of Register) {
    if (provider.info.id == id) {
      return new Ok(provider);
    }
  }
  return new Err(`Error:Can't find download provider with id ${id}`);
}

function getProviderList(): DownloadProviderInfo[] {
  return Register.map((n) => n.info);
}

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

export { getProvider, getProviderList, setProvider };
