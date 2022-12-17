import { log } from "../log";

import shell from "shelljs";
import * as fs from "fs";
import path from "path";

function del(filePath: string): boolean {
  if (!fs.existsSync(filePath)) {
    log(`Debug:File to be deleted not exist : ${filePath}`);
    return true;
  }
  shell.rm("-rf", filePath);
  return !fs.existsSync(filePath);
}

function isFolderPath(p: string): boolean {
  return path.extname(p) == "";
}

function mkdir(p: string): boolean {
  if (fs.existsSync(p)) {
    return true;
  }
  fs.mkdirSync(p, { recursive: true });
  return fs.existsSync(p);
}

export { del, isFolderPath, mkdir };
