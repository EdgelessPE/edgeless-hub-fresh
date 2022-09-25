import observableBridge from "./services/bridge/observable";
import { Ok, Result } from "ts-results";
import bridge from "./services/bridge/method";

let needInit = true;

async function init(webContents: any): Promise<Result<null, string>> {
  if (!needInit) {
    return new Ok(null);
  }

  // 初始化 rpc bridge
  bridge();

  // 初始化 observable bridge
  const initRes = await observableBridge(webContents);
  if (initRes.err) {
    return initRes;
  }

  // 结束初始化
  needInit = false;
  return new Ok(null);
}

export default init;
