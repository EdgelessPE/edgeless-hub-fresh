import { blockDevices } from "systeminformation";
import { FlashInfo } from "../../../../types/local";
import path from "path";
import fs from "fs";
import { Res } from "../../type";
import { scanKernels, scanPlugins } from "./scanners";
import { Ok } from "ts-results";

async function genFlashInfo(): Promise<Res<FlashInfo>> {
  const diskList = await blockDevices();

  // 选出可移动磁盘，且含有 Edgeless/version.txt
  const validDisks = diskList.filter((disk) => {
    return (
      disk.removable &&
      fs.existsSync(path.join(disk.mount, "Edgeless/version.txt"))
    );
  });

  // TODO:后续改成扫描和读取详情分开
  const selectedDisk = validDisks[0];
  const kernelsRes = await scanKernels(selectedDisk.mount);
  if (kernelsRes.err) {
    return kernelsRes;
  }
  const pluginsRes = await scanPlugins(
    path.join(selectedDisk.mount, "Edgeless/Resource"),
  );
  if (pluginsRes.err) {
    return pluginsRes;
  }

  return new Ok({
    letter: selectedDisk.mount,
    rw: true,
    kernels: kernelsRes.unwrap(),
    plugins: pluginsRes.unwrap(),
  });
}

export { genFlashInfo };
