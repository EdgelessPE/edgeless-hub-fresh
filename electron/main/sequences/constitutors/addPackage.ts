import { SeqNode } from "../Sequence";
import { Download, DownloadParams } from "../../modules/download";
import {
  InstallPackage,
  InstallPackageParams,
} from "../../modules/install/InstallPackage";
import { getTempConfig } from "../../services/config";
import * as path from "path";
import { FLASH_DISK_PACKAGE } from "../../constants";

function addPackage(): SeqNode[] {
  return [
    {
      name: "download",
      inputAdapter: (userInput: DownloadParams): DownloadParams => {
        return userInput;
      },
      moduleConstructor: Download,
    },
    {
      name: "install",
      inputAdapter: (userInput, prevReturned: string): InstallPackageParams => {
        const cfg = getTempConfig();
        const targetFilePath = path.join(cfg.flashDisk, FLASH_DISK_PACKAGE);
        return {
          sourceFilePath: prevReturned,
          targetFilePath,
        };
      },
      moduleConstructor: InstallPackage,
    },
  ];
}

export { addPackage };
