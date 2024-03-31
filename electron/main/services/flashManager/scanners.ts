import { Ok } from "ts-results";
import { FileNodePackageLocal, KernelLocal } from "../../../../types/local";
import { Res } from "../../type";
import { readDir } from "../../utils/fs";
import { log } from "../../log";
import path from "path";

const KERNEL_REGEX = /^Edgeless_(Alpha|Beta)_[0-9]+\.[0-9]+\.[0-9]+\.wim$/;
const VERSION_REGEX = /^[0-9]+\.[0-9]+(\.[0-9]+)?$/;

export async function scanKernels(p: string): Promise<Res<KernelLocal[]>> {
  const filesRes = await readDir(p);
  if (filesRes.err) {
    return filesRes;
  }
  const wimList = filesRes
    .unwrap()
    .filter(({ name }) => KERNEL_REGEX.test(name))
    .map(({ name }) => {
      const [, stage, version] = name.slice(0, -4).split("_");
      return {
        stage,
        version,
      } as KernelLocal;
    });
  return new Ok(wimList);
}

export async function scanPlugins(
  p: string,
): Promise<Res<FileNodePackageLocal[]>> {
  const filesRes = await readDir(p);
  if (filesRes.err) {
    return filesRes;
  }
  const res: FileNodePackageLocal[] = [];
  for (const { name, size, timestamp } of filesRes.unwrap()) {
    if (!name.includes(".7z")) {
      continue;
    }
    try {
      const [stem, flagsStr] = name.split(".7z");
      const [pluginName, version, author] = stem.split("_");
      if (VERSION_REGEX.test(version)) {
        log(`Warning:Ignore invalid plugin name :'${name}`);
        continue;
      }
      res.push({
        name,
        size,
        timestamp,
        pluginName,
        version,
        author: author.endsWith("（bot）") ? author.slice(0, -5) : author,
        isBotAuthor: author.endsWith("（bot）"),
        path: path.join(p, name),
        flags: flagsStr ? new Set(flagsStr.split("")) : undefined,
      });
    } catch (e) {
      log(`Warning:Ignore invalid plugin name :'${name}`);
    }
  }
  return new Ok(res);
}
