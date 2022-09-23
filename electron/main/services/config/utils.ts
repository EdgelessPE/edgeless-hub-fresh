import fs from "fs";
import { CONFIG_PATH } from "../../constants";
import { Err, Ok, Result } from "ts-results";
import { Config } from "./type";
import Ajv from "ajv";
import { initial } from "./initial";
import { log } from "../../log";
import Schema from "schema/config.json";
import path from "path";

const ajv = new Ajv();
const validator = ajv.compile(Schema.definitions.Config);

async function read(): Promise<Result<Config, string>> {
  return new Promise((resolve) => {
    if (!fs.existsSync(CONFIG_PATH)) {
      log(`Info:Config ${CONFIG_PATH} not found, use initial one`);
      resolve(new Ok(initial));
    }

    const rawText = fs.readFileSync(CONFIG_PATH).toString();
    let rawJson: Config;
    try {
      rawJson = JSON.parse(rawText);
    } catch (e) {
      resolve(new Err(`Error:Can't parse ${CONFIG_PATH} as json`));
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

function valid(dirty: any): Result<null, string> {
  validator.errors = undefined;
  const res = validator(dirty);
  if (res) {
    return new Ok(null);
  } else {
    return new Err(
      `Error:Can't valid ${CONFIG_PATH} as config : ${validator
        .errors!.join(",")
        .toString()}`
    );
  }
}

function patch(rawJson: any, patchJson: any): any {
  for (const key in patchJson) {
    if (!rawJson.hasOwnProperty(key)) {
      rawJson[key] = patchJson[key];
    } else {
      const rawVal = rawJson[key],
        patchVal = patchJson[key];
      if (typeof rawVal != typeof patchVal) {
        //类型不一致，直接放弃patch并可能会在后续的validate中抛出错误
        return rawJson;
      } else if (typeof rawVal == "object") {
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

export { read, write };
