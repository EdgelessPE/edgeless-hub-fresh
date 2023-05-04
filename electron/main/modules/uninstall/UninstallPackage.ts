import { Module, ModuleListener } from "../Module";
import { Err, Ok } from "ts-results";
import { Res } from "../../type";
import * as fs from "fs";
import { shell } from "electron";
import { del, mkdir, move } from "../../utils/shell";
import { maintainFlashCache } from "./flashCacheManager";
import { getDisabledFileName, parseFlashCacheLocation } from "./utils";
import * as path from "path";

interface UninstallPackageParams {
  targetFilePath: string;
  strategy: "FlashRecycle" | "ForceDelete" | "SystemRecycle";
}

type State = "running" | "completed" | "error";

class UninstallPackage extends Module {
  private readonly params: UninstallPackageParams;
  private listener: ModuleListener | null;

  constructor(params: UninstallPackageParams) {
    super();
    this.params = params;
    this.listener = null;
  }

  listen(listener: ModuleListener) {
    this.listener = listener;
  }

  async start(): Promise<Res<null>> {
    const { targetFilePath, strategy } = this.params;
    // 检查目标是否存在
    if (!fs.existsSync(targetFilePath)) {
      const msg = `Error:Can't find target package to be uninstalled : ${targetFilePath}`;
      this.switchState("error", msg);
      return new Err(msg);
    }
    this.switchState("running");
    // 删除策略分流
    const strategyMap: Record<
      UninstallPackageParams["strategy"],
      (target: string) => Promise<Res<null>>
    > = {
      async FlashRecycle(target: string): Promise<Res<null>> {
        const flashCacheDir = parseFlashCacheLocation(target).unwrap();
        maintainFlashCache(flashCacheDir);
        if (!mkdir(flashCacheDir)) {
          return new Err(`Error:Can't mkdir flash cache dir ${flashCacheDir}`);
        }
        const mRes = move(
          target,
          path.join(flashCacheDir, getDisabledFileName(path.basename(target)))
        );
        if (mRes.err) {
          return new Err(
            `Error:Can't move package to flash cache : ${mRes.val}`
          );
        }

        return new Ok(null);
      },
      async ForceDelete(target: string): Promise<Res<null>> {
        if (del(target)) {
          return new Ok(null);
        } else {
          return new Err(
            `Error:Can't delete package ${target} from file system`
          );
        }
      },
      async SystemRecycle(target: string): Promise<Res<null>> {
        try {
          await shell.trashItem(target);
        } catch (e) {
          return new Err(
            `Error:Can't move package ${target} to system recycle : ${JSON.stringify(
              e
            )}`
          );
        }
        return new Ok(null);
      },
    };
    const dRes = await strategyMap[strategy](targetFilePath);
    if (dRes.err) {
      this.switchState("error", dRes.val);
      return dRes;
    }

    // 最终检查
    if (fs.existsSync(targetFilePath)) {
      const msg = `Error:Can't uninstall package ${targetFilePath} with strategy ${strategy} : still exist after api call`;
      this.switchState("error", msg);
      return new Err(msg);
    }
    this.switchState("completed");
    return new Ok(null);
  }

  async command(cmd: string, payload: unknown): Promise<Res<null>> {
    return new Err(
      `Error:Fatal:No commands allowed in Uninstall Package module : received ${cmd} with payload ${payload}`
    );
  }

  async cancel(): Promise<Res<null>> {
    return new Err("Error:Fatal:Uninstall Package module can't be canceled");
  }

  private switchState(state: State, payload: string | null = null) {
    if (this.listener != null) {
      this.listener(state, payload, []);
    }
  }
}

export { UninstallPackage, UninstallPackageParams };
