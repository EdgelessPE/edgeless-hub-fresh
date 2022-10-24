import { Integrity } from "../../../../types";
import * as fs from "fs";
import { validateIntegrity } from "../integrity";

function getFileSize(filePath: string): number {
  const status = fs.statSync(filePath);
  return status.size;
}

function del(filePath: string) {
  fs.unlinkSync(filePath);
  return false;
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
    console.log(
      `Debug:Cache file size not match, expect ${totalSize}, got ${actualSize}`
    );
    return del(filePath);
  }
  // 检查文件哈希
  if (integrity) {
    const hashRes = await validateIntegrity(filePath, integrity);
    if (hashRes.err) {
      console.log(`Debug:Cache file validate not match : ${hashRes.val}`);
      return del(filePath);
    }
  }

  console.log(`Debug:Use cached file : ${filePath}`);
  return true;
}

export { existUsableFile };
