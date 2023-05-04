import { Err, Ok, Result } from "ts-results";
import { isFolderPath, mkdir } from "../../utils/shell";
import path from "path";

function installPackageUserInputValidator(
  targetPath: string,
  fileName: string
): Result<string, string> {
  if (isFolderPath(targetPath)) {
    // 处理文件夹路径
    if (mkdir(targetPath)) {
      return new Ok(path.join(targetPath, fileName));
    } else {
      return new Err(`Error:Can't mkdir ${targetPath}`);
    }
  } else {
    // 处理文件路径，查询父目录是否存在
    const parentDir = path.dirname(targetPath);
    if (mkdir(parentDir)) {
      return new Ok(targetPath);
    } else {
      return new Err(
        `Error:Can't mkdir parent folder ${parentDir} for ${targetPath}`
      );
    }
  }
}

export { installPackageUserInputValidator };
