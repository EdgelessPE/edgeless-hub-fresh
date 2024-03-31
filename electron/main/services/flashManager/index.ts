import { blockDevices } from "systeminformation";
import { FlashInfo, PossibleMount } from "../../../../types/local";
import path from "path";
import fs from "fs";
import { Res } from "../../type";
import { scanConfig, scanKernels, scanPlugins } from "./scanners";
import { Ok } from "ts-results";

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

export { genFlashInfo };
