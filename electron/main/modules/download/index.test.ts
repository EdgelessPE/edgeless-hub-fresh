import {Download} from "./index";

test("downloadModule", async () => {
  const instance = new Download({
    url: "https://pineapple.edgeless.top/disk/插件包/下载上传/NeatDownloadManager_1.4.0.0_undefined（bot）.7z",
    fileName: "NeatDownloadManager_1.4.0.0_undefined（bot）.7z",
    totalSize: 884953,
    integrity: {
      "method": "blake3",
      "value": "a3735a5809650c6f8e8a7af454c7eff01d34c54fcc48ab4004d3b5e79e76b25f"
    }
  })
  await instance.start();
})
