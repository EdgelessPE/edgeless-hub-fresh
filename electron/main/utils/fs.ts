import { Res } from "../type";
import { stat, readdir } from "fs/promises";
import { Ok } from "ts-results";
import path from "path";
import { FileNodeBasic } from "../../../types/local";

export async function readDir(p: string): Promise<Res<FileNodeBasic[]>> {
  const files = await readdir(p);
  const detailedList = await Promise.all(
    files.map(async (name) => {
      try {
        const s = await stat(path.join(p, name));
        return {
          name,
          size: s.size,
          timestamp: s.mtime.toString(),
        };
      } catch (e) {
        return undefined;
      }
    }),
  );
  return new Ok(detailedList.filter((list) => list !== undefined));
}
