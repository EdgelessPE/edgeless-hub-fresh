import { Err, Ok, Result } from "ts-results";
import fs from "fs";
import { ValidateFunction } from "ajv";

function getLocalImageSrc(fsPath: string): Result<string, string> {
  if (!fs.existsSync(fsPath)) {
    return new Err(`Error:Image path not exist : ${fsPath}`);
  }

  const base64 = fs.readFileSync(fsPath).toString("base64");
  return new Ok(`data:image/jpg;base64,${base64}`);
}

function validate<T>(
  data: T,
  validator: ValidateFunction,
  errorTip?: string
): Result<T, string> {
  validator.errors = undefined;
  const res = validator(data);
  if (res) {
    return new Ok(data);
  } else {
    const errMsg = JSON.stringify(validator.errors);
    const tip = errorTip
      ? errorTip.replace("{}", errMsg)
      : `Error:Can't validate data : ${errMsg}`;
    return new Err(tip);
  }
}

export { getLocalImageSrc, validate };
