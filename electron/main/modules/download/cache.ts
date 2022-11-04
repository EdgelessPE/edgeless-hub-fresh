import {Integrity} from "../../../../types";
import * as fs from "fs";
import {validateIntegrity} from "../../services/integrity";
import {log} from "../../log";
import {del} from "../../utils/shell";

function getFileSize(filePath: string): number {
  const status = fs.statSync(filePath);
  return status.size;
}

async function existUsableFile(
  filePath: string,
  totalSize: number,
  integrity?: Integrity
): Promise<boolean> {
  // 判断文件是否存在
  if (!fs.existsSync(filePath)) {
    return false;
  }
  // 检查文件大小
  const actualSize = getFileSize(filePath);
  if (totalSize != actualSize) {
    log(
      `Debug:Cache file size not match, expect ${totalSize}, got ${actualSize}`
    );
    if (!del(filePath)) {
      log(`Warning:Can't delete broken cache file : ${filePath}`)
    }
  }
  // 检查文件哈希
  if (integrity) {
    const hashRes = await validateIntegrity(filePath, integrity);
    if (hashRes.err) {
      log(`Debug:Cache file validate not match : ${hashRes.val}`);
      return del(filePath);
    }
  }

  log(`Debug:Use cached file : ${filePath}`);
  return true;
}

export {existUsableFile};
