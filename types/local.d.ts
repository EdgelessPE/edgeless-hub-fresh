import { Integrity } from "./index";

interface FileNodePackageLocal {
  name: string;
  size: number;
  timestamp: number;
  integrity?: Integrity;

  path: string;
  flags?: Set<string>; // 插件包属性，例如对于被禁用的 LocalBoost 插件包 *.7zfl 其值为 ["f","l"]
}

interface FileNodeLocal {
  name: string;
  version: string;
  path: string;
  size: number;
  timestamp: number;
}

interface VentoyLocal {
  version: string;
  secureBoot: boolean;
}

interface FlashInfo {
  letter: string;
  rw: boolean;
  kernel?: FileNodeLocal;
  alpha?: FileNodeLocal;
  ventoy?: VentoyLocal;
  plugins?: FileNodePackageLocal;
  configs?: {
    common?: string[];
    wallPaper?: string; // 壁纸路径
    resolution?: {
      method: "auto" | "none" | "custom";
      custom?: string;
    };
    homePage?: string;
  };
}

export { FileNodePackageLocal, FileNodeLocal, VentoyLocal, FlashInfo };
