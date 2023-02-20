import { Config } from "../../../../types/config";

export const initial: Config = {
  ept: {
    mirror: {
      current: "pineapple",
      pool: {
        pineapple: {
          name: "菠萝云",
          description: "Edgeless 官方镜像站",
          baseUrl: "https://pineapple.edgeless.top/api/v3",
          protocol: "3.1.0",
          property: {
            domestic_server: true,
            upload_bandwidth: 1000,
            sync_interval: 0,
            official_maintained: true,
          },
          services: [
            {
              name: "plugins",
              path: "disk/插件包/",
            },
            {
              name: "kernel",
              path: "disk/Socket/",
            },
            {
              name: "alpha",
              path: "disk/Socket/Alpha/",
            },
            {
              name: "ventoy",
              path: "disk/Socket/Ventoy/",
            },
            {
              name: "hub",
              path: "disk/Socket/Hub/",
            },
          ],
        },
      },
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
