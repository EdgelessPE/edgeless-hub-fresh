import { Config } from "../../../../types/config";

export const initial: Config = {
  ept: {
    mirror: {
      current: null,
      pool: {},
    },
    preferences: {
      deleteStrategy: "FlashRecycle",
    },
  },
  theme: "light",
  download: {
    provider: "nfd",
    cacheDir: "./cache",
    maxDownloadingTasks: 3,
  },
  flashDisk: null,
  preference: {
    userNick: "User",
  },
};
