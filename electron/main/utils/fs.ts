import { Res } from "../type";
import { stat, readdir } from "fs/promises";
import { Ok } from "ts-results";
import path from "path";
import { FileNodeBasic } from "../../../types/local";

export async function readDir(p: string): Promise<Res<FileNodeBasic[]>> {
  const files = await readdir(p);
  const detailedList = await Promise.all(
    files.map(async (name) => {
      const s = await stat(path.join(p, name));
      return {
        name,
        size: s.size,
        timestamp: s.mtime.toString(),
      };
    }),
  );
  return new Ok(detailedList);
}
