import { DownloadProviderInfo } from "../../../../../types/download";
import { Provider } from "./Provider";
import { NfdProvider } from "./nfd";
import { Err, Ok, Result } from "ts-results";

type ProviderConstructor = typeof Provider;

interface ProviderRegisterNode {
  info: DownloadProviderInfo;
  entrance: ProviderConstructor;
}

const register: ProviderRegisterNode[] = [
  {
    info: {
      name: "内置下载",
      description:
        "默认的下载引擎，不需要外部二进制依赖，仅支持单线程且不支持下载暂停",
      id: "nfd",
    },
    entrance: NfdProvider,
  },
];

function getProviderConstructor(
  id: string
): Result<ProviderConstructor, string> {
  const p = register.find((provider) => provider.info.id == id);
  if (p != null) {
    return new Ok(p.entrance);
  } else {
    return new Err(`Error:Can't find download provider with id ${id}`);
  }
}

export { getProviderConstructor };
