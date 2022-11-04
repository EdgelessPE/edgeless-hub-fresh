import {Err, Ok, Result} from "ts-results";
import * as fs from "fs";

const sha256File = require("sha256-file");

async function getHash(filePath: string): Promise<Result<string, string>> {
  return new Promise((resolve) => {
    if (!fs.existsSync(filePath)) {
      resolve(new Err(`Error:Can't open file ${filePath}`));
      return;
    }
    sha256File(filePath, (err: any, val: string | null) => {
      if (err) {
        resolve(
          new Err(
            `Error:Can't calculate sha256 digest for ${filePath} : ${JSON.stringify(
              err
            )}`
          )
        );
        return;
      }
      if (val) {
        resolve(new Ok(val));
        return;
      } else {
        resolve(
          new Err(
            `Error:Can't calculate sha256 digest for ${filePath} : received null result`
          )
        );
      }
    });
  });
}

export default getHash;
