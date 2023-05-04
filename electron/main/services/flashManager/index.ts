import { blockDevices } from "systeminformation";
import { FlashInfo } from "../../../../types/local";

async function genFlashInfo(): Promise<FlashInfo> {
  const diskList = await blockDevices();
  console.log(diskList);

  return {
    letter: "",
    rw: true,
  };
}

export { genFlashInfo };
