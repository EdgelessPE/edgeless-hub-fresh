import { Integrity } from "./index";

export interface FileNodeBasic {
  name: string;
  size: number;
  timestamp: string;
}
interface FileNodePackageLocal extends FileNodeBasic {
  integrity?: Integrity;
  path: string;

  pluginName: string;
  version: string;
  author: string;
  isBotAuthor: boolean;
  flags?: Set<string>; // 插件包属性，例如对于被禁用的 LocalBoost 插件包 *.7zfl 其值为 ["f","l"]
}

interface FileNodeLocal extends FileNodeBasic {
  version: string;
  path: string;
}

interface VentoyLocal {
  version: string;
  secureBoot: boolean;
}
export interface KernelLocal {
  stage: "Alpha" | "Beta";
  version: string;
}
interface FlashInfo {
  letter: string;
  rw: boolean;
  kernels?: KernelLocal[];
  ventoy?: VentoyLocal;
  plugins?: FileNodePackageLocal[];
  configs?: {
    common?: string[];
    wallPaper?: string; // 壁纸路径
    resolution?: {
      method: "auto" | "none" | "custom";
      custom?: string;
    };
    homePage?: string | "Disable";
  };
}

export { FileNodePackageLocal, FileNodeLocal, VentoyLocal, FlashInfo };

export interface PossibleMount {
  name: string;
  mount: string;
}
