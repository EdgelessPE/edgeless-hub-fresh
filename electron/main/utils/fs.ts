import { Res } from "../type";
import fs from "fs";
import { Err, Ok } from "ts-results";
import path from "path";
import { FileNodeBasic } from "../../../types/local";

export async function readDir(p: string): Promise<Res<FileNodeBasic[]>> {
  return new Promise((res) => {
    fs.readdir(p, (err, files) => {
      if (err) {
        res(new Err(`Error:Failed to read dir '${p} : ${err.message}`));
      } else {
        const detailedList = files.map((name) => {
          const stat = fs.statSync(path.join(p, name));
          return {
            name,
            size: stat.size,
            timestamp: stat.mtime.toString(),
          };
        });
        res(new Ok(detailedList));
      }
    });
  });
}
