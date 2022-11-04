import {log} from "../log";

import shell from "shelljs";
import * as fs from "fs";

function del(filePath: string): boolean {
  if (!fs.existsSync(filePath)) {
    log(`Debug:File to be deleted not exist : ${filePath}`);
    return true;
  }
  shell.rm("-rf", filePath);
  return !fs.existsSync(filePath);
}

export { del };
