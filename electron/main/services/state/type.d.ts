import { Config } from "../config/type";
import { DiskRaw, VentoyLocal } from "types/local";

interface State {
  config: Config;
  bootDevice: {
    current: Disk;
    availableList: Disk[];
  };
}

interface Disk {
  letter: string;
  rawInfo: DiskRaw;
  ventoyInfo: VentoyLocal;
}
