import { SeqNode } from "../Sequence";
import { RemovePackageUserInput } from "../../../../types/sequencesUserInput";
import {
  UninstallPackage,
  UninstallPackageParams,
} from "../../modules/uninstall/UninstallPackage";
import { getTempConfig } from "../../services/config";

function removePackage(): SeqNode<RemovePackageUserInput>[] {
  return [
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
  ];
}

export { removePackage };
