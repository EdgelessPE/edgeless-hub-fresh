import { SeqNode } from "../Sequence";
import {
  UninstallPackage,
  UninstallPackageParams,
} from "../../modules/uninstall/UninstallPackage";
import { UpdatePackageUserInput } from "../../../../types/sequencesUserInput";
import { getTempConfig } from "../../services/config";
import {
  InstallPackage,
  InstallPackageParams,
} from "../../modules/install/InstallPackage";
import { DownloadParams } from "../../../../types/download";
import { Download } from "../../modules/download";

function updatePackage(): SeqNode<UpdatePackageUserInput>[] {
  return [
    {
      name: "download",
      moduleInputAdapter: (userInput): DownloadParams => {
        return userInput.downloadParams;
      },
      moduleConstructor: Download,
    },
    {
      name: "uninstall",
      moduleInputAdapter: (userInput): UninstallPackageParams => {
        // 从配置中读取移除策略
        const { deleteStrategy: strategy } = getTempConfig().ept.preferences;

        return {
          targetFilePath: userInput.targetPath,
          strategy,
        };
      },
      moduleConstructor: UninstallPackage,
    },
    {
      name: "install",
      moduleInputAdapter: (
        userInput,
        prevReturned: string[]
      ): InstallPackageParams => {
        return {
          sourceFilePath: prevReturned[0],
          targetFilePath: userInput.targetPath,
        };
      },
      moduleConstructor: InstallPackage,
    },
  ];
}

export { updatePackage };
