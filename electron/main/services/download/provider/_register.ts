import {Provider} from "./type";
import {NFDProvider} from "./nfd";
import {Err, Ok, Result} from "ts-results";
import {DownloadProviderInfo} from "../../../../../types/download";

const register: Provider[] = [NFDProvider];

function getProvider(id: string): Result<Provider, string> {
  for (const provider of register) {
    if (provider.info.id == id) {
      return new Ok(provider);
    }
  }
  return new Err(`Error:Can't find download provider with id ${id}`);
}

function getProviderList(): DownloadProviderInfo[] {
  return register.map((n) => n.info);
}

export {
  getProvider,
  getProviderList
}
