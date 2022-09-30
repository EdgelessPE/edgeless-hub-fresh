import { Err, Ok, Result } from "ts-results";
import fs from "fs";
import { ValidateFunction } from "ajv";
import axios, { AxiosError } from "axios";

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

type ErrHandler = (err: AxiosError) => string;
async function fetch<T>(
  url: string,
  errTip?: string | ErrHandler
): Promise<Result<T, string>> {
  try {
    const res = await axios.get(url);
    return new Ok(res.data);
  } catch (e: any) {
    const errMsg = JSON.stringify(e);
    if (typeof errTip == "string") {
      const tip = errTip
        ? errTip.replace("{}", errMsg)
        : `Error:Can't fetch ${url} : ${errMsg}`;
      return new Err(tip);
    } else if (typeof errTip == "function") {
      return new Err(errTip(e));
    } else {
      return new Err(`Error:Can't fetch ${url} : ${errMsg}`);
    }
  }
}

function joinUrl(base: string, suffix: string) {
  if (base[base.length - 1] == "/") {
    return base + suffix;
  } else {
    return base + "/" + suffix;
  }
}

export { getLocalImageSrc, validate, fetch, joinUrl };
