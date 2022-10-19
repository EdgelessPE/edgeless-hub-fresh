import { Theme } from "./theme";
import { MirrorLocal } from "./ept";

export interface Config {
  ept: {
    mirror: {
      current: string | null;
      pool: Record<string, MirrorLocal>;
    };
  };
  theme: Theme;
  download: {
    provider: string;
    cacheDir: string;
  };
}

