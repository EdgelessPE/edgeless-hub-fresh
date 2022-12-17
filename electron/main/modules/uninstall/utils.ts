import { Res } from "../../type";
import { Err, Ok } from "ts-results";

const packagePathWindowsRegex = /^([A-Z]):\/Edgeless\/Resource\/\S+/;

function parseFlashCacheLocation(target: string): Res<string> {
  const targetFile = target.replace(/\\/g, "/");

  //TODO:允许自定义回收站位置，适配 linux
  if (!packagePathWindowsRegex.test(targetFile)) {
    return new Err(`Error:Fatal:Invalid package path : ${targetFile}`);
  }
  return new Ok(targetFile[0] + ":/Edgeless/Resource/过期插件包");
}

export { parseFlashCacheLocation };
