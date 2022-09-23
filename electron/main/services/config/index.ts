import { Observable } from "rxjs";
import { watch } from "fs";
import { patch, read, valid, write } from "./utils";
import { Config } from "./type";
import { log } from "../../log";
import { Ok, Result } from "ts-results";
import { CONFIG_PATH } from "../../constants";

// 始终持有一份config的最新副本以在更新时用作补丁母版
let cfg: Config | null = null;

async function getObservableConfig(): Promise<
  Result<Observable<Config>, string>
> {
  const res = await read();
  if (res.err) {
    return res;
  }

  const observable = new Observable<Config>((subscriber) => {
    const update = (config: Config) => {
      subscriber.next(config);
      cfg = config;
    };
    update(res.unwrap());
    watch(CONFIG_PATH, async () => {
      log(`Info:Config file change observed`);
      const res = await read();
      if (res.ok) {
        update(res.val);
      } else {
        subscriber.error(res.val);
        // cfg=null
        log(`Error:Can't read config from filesystem change : ${res.val}`);
      }
    });
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
  factory: (rawConfig: Config) => Config
): Promise<Result<null, string>> {
  const resultJson = factory(cfg);

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
