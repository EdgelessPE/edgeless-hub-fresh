import { BehaviorSubject } from "rxjs";
import { Res } from "../../type";
import { FlashInfo } from "../../../../types/local";
import { getObservableFlashInfo, getPossibleMounts } from "./index";
import { log } from "../../log";
import { Err, Ok } from "ts-results";

export const flashGlobalSubject = new BehaviorSubject<Res<FlashInfo>>(
  new Err("Error:No available Edgeless mounts"),
);
const currentCtx: {
  mount?: string;
  cancelWatchCallback?: () => void;
} = {};

export async function initFlashGlobal() {
  // 查找第一个可用的盘符
  const findDiskRes = await getPossibleMounts();
  if (findDiskRes.err) {
    log(`Warning:Failed to get possible mounts : ${findDiskRes.val}`);
    return;
  }
  const findDiskArr = findDiskRes.unwrap();
  if (!findDiskArr.length) {
    log(`Warning:Possible mounts not found`);
    return;
  }
  const disk = findDiskArr[0];

  // 配置当前的 Observable
  const obsRes = await getObservableFlashInfo(disk.mount);
  if (obsRes.err) {
    console.log(obsRes.val);
    return;
  }
  const { observable, cancelWatchCallback } = obsRes.unwrap();
  observable.subscribe(flashGlobalSubject);
  currentCtx.mount = disk.mount;
  currentCtx.cancelWatchCallback = cancelWatchCallback;
  log(
    `Info:Set current flash global observable with ${disk.name}(${disk.mount})`,
  );
}

export async function changeFlashGlobal(mount: string): Promise<Res<void>> {
  const obsRes = await getObservableFlashInfo(mount);
  if (obsRes.err) {
    return obsRes;
  }
  currentCtx.cancelWatchCallback();
  const { observable, cancelWatchCallback } = obsRes.unwrap();
  observable.subscribe(flashGlobalSubject);
  currentCtx.cancelWatchCallback = cancelWatchCallback;
  log(`Info:Change current flash global observable with mount '${mount}'`);

  return new Ok(undefined);
}

export function getCurrentFlashMount(): string | undefined {
  return currentCtx.mount;
}
