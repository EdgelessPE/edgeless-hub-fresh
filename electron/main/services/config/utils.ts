import fs from 'fs'
import {CONFIG_PATH} from "../../constants";
import {Err, Ok, Result} from "ts-results";
import {Config} from "./type";
import Ajv from "ajv";
import {initial} from "./initial";
import {log} from "../../log";
import {patch} from "./patch";

const Schema = require("schema/config.json")
const ajv = new Ajv()
const validator = ajv.compile(Schema.definitions.Config)

export function read(): Result<Config, string> {
  if (!fs.existsSync(CONFIG_PATH)) {
    log(`Info:Config ${CONFIG_PATH} not found, use initial one`)
    return new Ok(initial)
  }

  const rawText = fs.readFileSync(CONFIG_PATH).toString()
  let rawJson: Config
  try {
    rawJson = JSON.parse(rawText)
  } catch (e) {
    return new Err(`Error:Can't parse ${CONFIG_PATH} as json`)
  }

  const patchedJson = patch(rawJson, initial)

  const validationRes = valid(patchedJson)
  if (validationRes.err) {
    return validationRes
  } else {
    return new Ok(patchedJson)
  }
}


function valid(dirty: any): Result<null, string> {
  validator.errors = undefined
  const res = validator(dirty)
  if (res) {
    return new Ok(null)
  } else {
    return new Err(`Error:Can't valid ${CONFIG_PATH} as config : ${validator.errors!.toString()}`)
  }
}
