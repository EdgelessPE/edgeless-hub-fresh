import { Err, Ok, Result } from "ts-results";
import fs from "fs";

function getLocalImageSrc(fsPath: string): Result<string, string> {
  if (!fs.existsSync(fsPath)) {
    return new Err(`Error:Image path not exist : ${fsPath}`);
  }

  const base64 = fs.readFileSync(fsPath).toString("base64");
  return new Ok(`data:image/jpg;base64,${base64}`);
}

export { getLocalImageSrc };
