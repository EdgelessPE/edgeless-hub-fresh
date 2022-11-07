import { Config } from "../../../../types/config";

export const initial: Config = {
  ept: {
    mirror: {
      current: null,
      pool: {},
    },
  },
  theme: "light",
  download: {
    provider: "nfd",
    cacheDir: "./cache",
    maxDownloadingTasks: 3,
  },
};
