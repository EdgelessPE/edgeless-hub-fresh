import { SeqNode } from "../Sequence";
import { RemovePackageUserInput } from "../../../../types/sequencesUserInput";
import {
  UninstallPackage,
  UninstallPackageParams,
} from "../../modules/uninstall/UninstallPackage";

function removePackage(): SeqNode<RemovePackageUserInput>[] {
  return [
    {
      name: "uninstall",
      moduleInputAdapter: ({
        targetPath: targetFilePath,
        strategy,
      }): UninstallPackageParams => {
        return {
          targetFilePath,
          strategy,
        };
      },
      moduleConstructor: UninstallPackage,
    },
  ];
}

export { removePackage };
