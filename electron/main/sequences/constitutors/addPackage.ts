import { SeqNode } from "../Sequence";
import { Download, DownloadParams } from "../../modules/download";
import {
  InstallPackage,
  InstallPackageParams,
} from "../../modules/install/InstallPackage";
import { getTempConfig } from "../../services/config";
import * as path from "path";
import { FLASH_DISK_PACKAGE } from "../../constants";
import { AddPackageUserInput } from "../../../../types/sequencesUserInput";
import { Err, Ok } from "ts-results";
import { installPackageUserInputValidator } from "../../modules/install/userInputValidator";
import * as fs from "fs";
import { RendererSequence } from "../../../../types/sequence";
import { TaskStatus } from "../../../../types";
import { TaskProgressNotification } from "../../../../types/module";

function addPackage(): SeqNode<AddPackageUserInput>[] {
  return [
    {
      name: "download",
      moduleInputAdapter: (userInput): DownloadParams => {
        return userInput.downloadParams;
      },
      moduleConstructor: Download,
    },
    {
      name: "install",
      userInputValidator: (userInput) => {
        // 检查 u盘 是否存在
        const { flashDisk } = getTempConfig();
        if (flashDisk == null || !fs.existsSync(flashDisk)) {
          return new Err(`Error:Flash disk(${flashDisk}) not exist`);
        }

        if (userInput.targetPath == null) return new Ok(null);
        const vRes = installPackageUserInputValidator(
          userInput.targetPath,
          userInput.downloadParams.fileName
        );
        if (vRes.err) return vRes;

        return new Ok({
          ...userInput,
          targetPath: vRes.unwrap(),
        });
      },
      moduleInputAdapter: (
        userInput,
        prevReturned: string[]
      ): InstallPackageParams => {
        const downloadedFilePath = prevReturned[0];
        const targetFilePath =
          userInput.targetPath ??
          path.join(
            getTempConfig().flashDisk,
            FLASH_DISK_PACKAGE,
            path.basename(downloadedFilePath)
          );
        return {
          sourceFilePath: downloadedFilePath,
          targetFilePath,
        };
      },
      moduleConstructor: InstallPackage,
    },
  ];
}

function addPackageTaskStatusAdapter(
  cur: RendererSequence["current"]
): TaskStatus {
  if (cur.state.type == "error") {
    return {
      state: "Error",
    };
  }
  const progress = cur.state.payload as TaskProgressNotification | null;
  switch (cur.name) {
    case "download":
      if (cur.state.type == "queuing") {
        return {
          state: "Pending",
        };
      }
      return {
        state: "Downloading",
        percentage: progress?.percent ?? 100,
      };
    case "install":
      return {
        state: "Installing",
        percentage: progress?.percent ?? 100,
      };
  }
}

export { addPackage, addPackageTaskStatusAdapter };
