import { Provider, ProviderParams, TaskProgressListener } from "./Provider";
import { Res } from "../../../type";
import { Err, Ok } from "ts-results";

const Downloader = require("nodejs-file-downloader");

interface ProgressUpdate {
  time: number;
  remainingSize: number;
}

export class NfdProvider extends Provider {
  recent: ProgressUpdate;

  constructor(params: ProviderParams, listener: TaskProgressListener) {
    super(params, listener);
    this.recent = {
      time: Date.now(),
      remainingSize: 0,
    };
  }

  async init(): Promise<Res<null>> {
    return new Ok(null);
  }

  async remove(): Promise<Res<null>> {
    return new Ok(null);
  }

  async start(): Promise<Res<null>> {
    // 解构下载参数
    const { url, fileName, dir, totalSize } = this.params;
    // 初始化 recent 变量
    this.recent = {
      time: Date.now(),
      remainingSize: totalSize,
    };

    // 提前构造 onProgress 监听函数以访问 NfdProvider 实例
    const onProgress = (
      percentage: string,
      chunk: object,
      remainingSize: number
    ) => {
      const current: ProgressUpdate = {
        time: Date.now(),
        remainingSize,
      };
      if (current.time - this.recent.time < 1000) return;
      this.listener({
        percent: Number(percentage),
        speed: Number(calcSpeed(this.recent, current)),
      });
      this.recent = current;
    };
    // 获取 nfd handler
    const downloadHandler = new Downloader({
      url,
      directory: dir,
      fileName,
      onProgress,
    });

    // 开始下载
    return new Promise((resolve) => {
      downloadHandler
        .download()
        .then(() => {
          resolve(new Ok(null));
        })
        .catch((e: any) => {
          resolve(
            new Err(
              `Error:Nfd provider can't download file : ${JSON.stringify(e)}`
            )
          );
        });
    });
  }
}

function calcSpeed(recent: ProgressUpdate, current: ProgressUpdate) {
  const timePassedMilliSecond = current.time - recent.time;
  const sizeFinishedByte = recent.remainingSize - current.remainingSize;
  return ((sizeFinishedByte / timePassedMilliSecond) * 1000).toFixed(2);
}
