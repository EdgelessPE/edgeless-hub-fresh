import Downloader from "nodejs-file-downloader";
import {Ok, Result} from "ts-results";
import {AddTaskFn, MayErrorReturned, Provider} from "./type";
import path from "path";

interface ProgressUpdate {
  time: number;
  remainingSize: number;
}

const init = async (): Promise<Result<null, string>> => new Ok(null);

const addTask: AddTaskFn = async (url, dir, suggested, subscriber) => {
  const { fileName, totalSize } = suggested;
  let recent: ProgressUpdate = {
    time: Date.now(),
    remainingSize: totalSize,
  };

  const downloadHandler = new Downloader({
    url,
    directory: dir,
    fileName,
    onProgress(percentage: string, chunk: object, remainingSize: number) {
      const current: ProgressUpdate = {
        time: Date.now(),
        remainingSize,
      };
      if (current.time - recent.time < 1000) return
      subscriber.next({
        percent: Number(percentage),
        speed: calcSpeed(recent, current),
      });
      recent = current;
    },
  });

  return new Ok({
    targetPosition: path.join(dir, fileName),
    handler: {
      start: async () => {
        return new Promise<MayErrorReturned>(resolve => {
          try {
            downloadHandler
              .download()
              .then(() => subscriber.complete())
          } catch (e) {
            subscriber.error(e);
          }
        })
      },
      remove: async () => {
        // TODO:删除临时文件，如果存在的话
        return new Ok(null)
      }
    }
  });
};

function calcSpeed(recent: ProgressUpdate, current: ProgressUpdate) {
  const timePassedMilliSecond = (current.time - recent.time);
  const sizeFinishedByte = recent.remainingSize - current.remainingSize;
  const res = (sizeFinishedByte / timePassedMilliSecond) * 1000

  return res;
}

export const NFDProvider: Provider = {
  info: {
    name: "内置下载",
    description:
      "默认的下载引擎，不需要外部二进制依赖，仅支持单线程且不支持下载暂停",
    id: "nfd",
  },
  init,
  addTask,
};
