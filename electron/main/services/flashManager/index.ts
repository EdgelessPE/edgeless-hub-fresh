import { blockDevices } from "systeminformation";
import { FlashInfo, PossibleMount } from "../../../../types/local";
import path from "path";
import fs, { watch } from "fs";
import { scanConfig, scanKernels, scanPlugins } from "./scanners";
import { Ok, Result } from "ts-results";
import { Observable } from "rxjs";
import { log } from "../../log";
import { debounce } from "lodash";
import { Res } from "../../../../types/res";

const _FLAG_ALLOW_LOCAL_DISK = true;

export async function getPossibleMounts(): Promise<Res<PossibleMount[]>> {
  const diskList = await blockDevices();

  // 选出可移动磁盘，且含有 Edgeless/version.txt
  const validDisks = diskList.filter((disk) => {
    return (
      (_FLAG_ALLOW_LOCAL_DISK || disk.removable) &&
      fs.existsSync(path.join(disk.mount, "Edgeless/version.txt"))
    );
  });

  return new Ok(
    validDisks.map(({ label, mount }) => ({
      name: label || mount,
      mount,
    })),
  );
}

async function genFlashInfo(mount: string): Promise<Res<FlashInfo>> {
  const kernelsRes = await scanKernels(mount);
  if (kernelsRes.err) {
    return kernelsRes;
  }
  const pluginsRes = await scanPlugins(path.join(mount, "Edgeless/Resource"));
  if (pluginsRes.err) {
    return pluginsRes;
  }
  const configRes = await scanConfig(path.join(mount, "Edgeless"));
  if (configRes.err) {
    return configRes;
  }

  return new Ok({
    letter: mount,
    rw: true,
    kernels: kernelsRes.unwrap(),
    plugins: pluginsRes.unwrap(),
    configs: configRes.unwrap(),
  });
}

export async function getObservableFlashInfo(mount: string): Promise<
  Res<{
    observable: Observable<Res<FlashInfo>>;
    cancelWatchCallback: () => void;
  }>
> {
  const res = await genFlashInfo(mount);
  if (res.err) {
    log(res.val);
    return res;
  }
  let handler: fs.FSWatcher | undefined = undefined;
  const observable = new Observable<Res<FlashInfo>>((subscriber) => {
    const update = (result: Result<FlashInfo, string>) => {
      subscriber.next(result);
      if (result.err) {
        log(`Error:Can't update flash info at '${mount}' : ${res.val}`);
      }
    };
    update(res);
    handler = watch(
      mount,
      { recursive: true },
      debounce(async () => {
        log(`Info:Flash change at '${mount}' watched`);
        update(await genFlashInfo(mount));
      }, 50),
    );
  });
  const cancelWatchCallback = () => {
    handler?.close();
  };

  return new Ok({ observable, cancelWatchCallback });
}
