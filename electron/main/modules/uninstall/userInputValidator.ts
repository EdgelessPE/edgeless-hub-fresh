import { parseFlashCacheLocation } from "./utils";

function uninstallPackageUserInputValidator(target: string): boolean {
  return parseFlashCacheLocation(target).ok;
}
