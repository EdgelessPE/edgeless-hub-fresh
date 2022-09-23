import { Config } from "../config/type";
import { VentoyLocal } from "../../../../types/local";

interface State {
  config: Config;
  bootDevice: {
    current: Disk;
    availableList: Disk[];
  };
}

interface Disk {
  letter: string;
  rawInfo: {}; //TODO:补充raw信息
  ventoyInfo: VentoyLocal;
}
