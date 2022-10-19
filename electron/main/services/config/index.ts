import { Observable } from "rxjs";
import { watch } from "fs";
import { patch, read, valid, write } from "./utils";
import { Config } from "../../../../types/config";
import { log } from "../../log";
import { Ok, Result } from "ts-results";
import { CONFIG_PATH } from "../../constants";
import { debounce } from "lodash";
import { initial } from "./initial";

// 始终持有一份config的最新副本以在更新时用作补丁母版
let cfg: Config | null = null;

// 用于轻量地获取一份临时配置信息
function getTempConfig(): Config {
  return cfg!;
}

async function getObservableConfig(): Promise<
  Result<Observable<Result<Config, string>>, string>
> {
  const res = await read();
  if (res.err) {
    log(res.val);
    return res;
  }

  const observable = new Observable<Result<Config, string>>((subscriber) => {
    const update = (result: Result<Config, string>) => {
      subscriber.next(result);
      if (result.ok) {
        cfg = result.val;
      } else {
        log(`Error:Can't update config : ${res.val}`);
      }
    };
    update(res);

    watch(
      CONFIG_PATH,
      debounce(async () => {
        log(`Info:Config file change watched`);
        update(await read());
      }, 50)
    );
  });

  return new Ok(observable);
}

async function patchObservableConfig<K extends keyof Config>(patchJson: {
  [P in K]: Config[P];
}): Promise<Result<null, string>> {
  const patchedJson = patch(cfg, patchJson);

  const vRes = valid(patchedJson);
  if (vRes.err) {
    return vRes;
  }

  return write(patchedJson);
}

async function modifyObservableConfig(
  modifier: (rawConfig: Config) => Config
): Promise<Result<null, string>> {
  const resultJson = modifier(cfg);

  const vRes = valid(resultJson);
  if (vRes.err) {
    return vRes;
  }

  return write(resultJson);
}

async function setObservableConfig(
  resultConfig: Config
): Promise<Result<null, string>> {
  const vRes = valid(resultConfig);
  if (vRes.err) {
    return vRes;
  }

  return write(resultConfig);
}

async function resetObservableConfig(): Promise<Result<null, string>> {
  return write(initial);
}

export {
  getTempConfig,
  getObservableConfig,
  setObservableConfig,
  patchObservableConfig,
  modifyObservableConfig,
  resetObservableConfig,
};
