import Downloader from "nodejs-file-downloader";
import { Ok, Result } from "ts-results";
import { AddTaskFn } from "../type";
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
      subscriber.next({
        percent: Number(percentage),
        speed: calcSpeed(recent, current),
      });
      recent = current;
    },
  });

  try {
    await downloadHandler.download();
    subscriber.complete();
  } catch (e) {
    subscriber.error(e);
  }

  return new Ok({
    targetPosition: path.join(dir, fileName),
  });
};

function calcSpeed(recent: ProgressUpdate, current: ProgressUpdate) {
  const timePassedSecond = (current.time - recent.time) / 1000;
  const sizeFinishedByte = current.remainingSize - recent.remainingSize;

  return sizeFinishedByte / timePassedSecond;
}
