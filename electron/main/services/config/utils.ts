import fs from "fs";
import {CONFIG_PATH} from "../../constants";
import {Err, Ok, Result} from "ts-results";
import {Config} from "../../../../types/config";
import Ajv from "ajv";
import {initial} from "./initial";
import {log} from "../../log";
import Schema from "../../../schema/config.json";
import path from "path";
import {validate} from "../../utils";

const ajv = new Ajv();
const validator = ajv.compile(Schema);

async function read(): Promise<Result<Config, string>> {
  return new Promise(async (resolve) => {
    if (!fs.existsSync(CONFIG_PATH)) {
      log(`Info:Config ${CONFIG_PATH} not found, use initial one`);
      await write(initial);
      resolve(new Ok(initial));
    }

    const rawText = fs.readFileSync(CONFIG_PATH).toString();
    let rawJson: Config;
    try {
      rawJson = JSON.parse(rawText);
    } catch (e) {
      resolve(new Err(`Error:Can't parse ${CONFIG_PATH} as json`));
      return;
    }

    const patchedJson = patch(rawJson, initial);

    const validationRes = valid(patchedJson);
    if (validationRes.err) {
      resolve(validationRes);
    } else {
      resolve(new Ok(patchedJson));
    }
  });
}

function valid(dirty: any) {
  return validate(dirty, validator, `Error:Can't validate config : {}`);
}

function patch<T extends object, K extends keyof T>(
  rawJson: T,
  patchJson: { [P in K]: T[P] }
): T {
  for (const key in patchJson) {
    if (!rawJson.hasOwnProperty(key)) {
      // @ts-ignore
      rawJson[key] = patchJson[key];
    } else {
      const rawVal = rawJson[key],
        patchVal = patchJson[key];
      if (typeof rawVal != typeof patchVal) {
        // 类型不一致，直接放弃patch并可能会在后续的validate中抛出错误
        return rawJson;
      } else if (typeof rawVal == "object") {
        // @ts-ignore
        rawJson[key] = patch(rawVal, patchVal);
      }
    }
  }
  return rawJson;
}

async function write(config: Config): Promise<Result<null, string>> {
  return new Promise((resolve) => {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      if (!fs.existsSync(dir)) {
        resolve(new Err(`Error:Can't create directory ${dir} to write config`));
      }
    }

    const content = JSON.stringify(config, null, 2);
    fs.writeFileSync(CONFIG_PATH, content);

    if (fs.existsSync(CONFIG_PATH)) {
      resolve(new Ok(null));
    } else {
      resolve(new Err(`Error:Can't write config to ${CONFIG_PATH}`));
    }
  });
}

export { read, write, patch, valid };
