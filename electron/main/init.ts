import { initObservableBridge } from "./services/bridge/observable";
import { Ok, Result } from "ts-results";
import bridge from "./services/bridge/method";
import { InitError } from "../../types";
import type { WebContents } from "electron";

let needInit = true;

async function init(
  webContents: WebContents
): Promise<Result<null, InitError>> {
  if (!needInit) {
    return new Ok(null);
  }

  // 初始化 rpc bridge
  bridge();

  // 初始化 observable bridge
  const initRes = await initObservableBridge(webContents);
  if (initRes.err) {
    return initRes;
  }

  // 结束初始化
  needInit = false;
  return new Ok(null);
}

export default init;
