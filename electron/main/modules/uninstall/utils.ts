import { Res } from "../../type";
import { Err, Ok } from "ts-results";
import * as path from "path";

const packagePathWindowsRegex = /^([A-Z]):\/Edgeless\/Resource\/\S+/;

function parseFlashCacheLocation(target: string): Res<string> {
  const targetFile = target.replace(/\\/g, "/");

  //TODO:允许自定义回收站位置，适配 linux
  if (!packagePathWindowsRegex.test(targetFile)) {
    return new Err(`Error:Fatal:Invalid package path : ${targetFile}`);
  }
  return new Ok(targetFile[0] + ":/Edgeless/Resource/过期插件包");
}

/**
 * 生成到 UNIX 纪元开始时间的整数天数
 */
function generateTimestamp() {
  const n = Date.now();
  return Math.floor(n / (1000 * 60 * 60 * 24));
}

/**
 * 使用 Flash Cache 的卸载策略时从此封装中获取被禁用之后的文件名，例如 Vscode.7zl -> Vscode.7zf_14514
 * @param sourceFileName
 */
function getDisabledFileName(sourceFileName: string) {
  const ext = path.extname(sourceFileName);
  const base = sourceFileName.substring(0, sourceFileName.length - ext.length);
  const newExt = `.7zf_${generateTimestamp()}`;
  return base + newExt;
}

export { parseFlashCacheLocation, generateTimestamp, getDisabledFileName };
