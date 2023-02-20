import { Theme } from "./theme";
import { MirrorLocal } from "./ept";

export interface Config {
  ept: {
    mirror: {
      current: string | null;
      pool: Record<string, MirrorLocal>;
    };
    preferences: {
      deleteStrategy: "FlashRecycle" | "ForceDelete";
    };
  };
  theme: Theme;
  download: {
    provider: string;
    cacheDir: string;
    maxDownloadingTasks: number;
  };
  flashDisk: string | null;
  preference: {
    userNick: string;
  };
}
