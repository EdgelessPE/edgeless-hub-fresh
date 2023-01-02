import { DownloadParams } from "./download";

interface AddPackageUserInput {
  downloadParams: DownloadParams;
  targetPath?: string; // 支持 目标目录绝对路径 或 目标文件绝对路径
}

interface RemovePackageUserInput {
  targetPath: string;
  strategy: "FlashRecycle" | "ForceDelete";
}

interface UpdatePackageUserInput {
  downloadParams: DownloadParams;
  targetPath: string;
}

export { AddPackageUserInput, RemovePackageUserInput, UpdatePackageUserInput };
