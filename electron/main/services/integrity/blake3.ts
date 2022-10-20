import {createHash, load} from "blake3"
import * as fs from "fs"
import {Err, Ok, Result} from "ts-results";

async function getHash(filePath: string): Promise<Result<string, string>> {
  return new Promise(async (resolve) => {
    if (!fs.existsSync(filePath)) {
      resolve(new Err(`Error:Can't open file ${filePath}`))
      return
    }
    await load()
    const stream = fs.createReadStream(filePath)
    const hash = createHash();
    stream.on('data', (d) => hash.update(d));
    stream.on('error', (err) => {
      hash.dispose();
      resolve(new Err(`Error:Can't calculate hash for ${filePath} : ${JSON.stringify(err)}`))
      return
    });
    stream.on('end', () => {
      const res = hash.digest("hex") as unknown as string
      resolve(new Ok(res))
      return
    });
  })
}

export {
  getHash
}
