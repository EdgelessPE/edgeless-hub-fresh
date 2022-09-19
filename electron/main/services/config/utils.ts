import fs from 'fs'
import {CONFIG_PATH} from "../../constants";
import {Err, Ok, Result} from "ts-results";
import {Config} from "./type";

export function read(): Result<Config, string> {
  const rawText = fs.readFileSync(CONFIG_PATH).toString()
  let rawJson: Config
  try {
    rawJson = JSON.parse(rawText)
  } catch (e) {
    return new Err(`Error:Can't parse ${CONFIG_PATH} as json`)
  }


}

function patch(raw: any): any {

}

function valid(dirty: any): Result<void, string> {
  return new Ok(null)
}

