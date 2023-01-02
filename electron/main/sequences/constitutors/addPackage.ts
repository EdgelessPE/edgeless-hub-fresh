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
import { Ok } from "ts-results";
import { installPackageUserInputValidator } from "../../modules/install/userInputValidator";

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

export { addPackage };
