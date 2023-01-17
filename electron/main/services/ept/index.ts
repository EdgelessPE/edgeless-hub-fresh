import { Res } from "../../type";
import { DownloadParams } from "../../../../types/download";
import { getHello } from "./cache";
import { Err, Ok } from "ts-results";
import * as path from "path";
import { AddPackageUserInput } from "../../../../types/sequencesUserInput";
import { log } from "../../log";
import { parsePackageName } from "../../utils/parser";
import { addMultiSequence } from "../../sequences/rendererAdapter";

async function eptInstall(
  name: string,
  options?: {
    load?: boolean; // 是否在安装之后加载
  }
): Promise<Res<string>> {
  const infoRes = await eptInfo(name);
  if (infoRes.err) return infoRes;
  const userInput: AddPackageUserInput = {
    downloadParams: infoRes.unwrap(),
  };

  const id = addMultiSequence("addPackage", userInput);
  return new Ok(id);
}

async function eptInfo(name: string): Promise<Res<DownloadParams>> {
  const helloRes = await getHello();
  if (helloRes.err) return helloRes;
  const list = helloRes.unwrap().plugins;
  if (list == null) {
    return new Err(`Error:Current mirror doesn't provide plugins`);
  }
  const { path: root, tree } = list;
  for (const cate in tree) {
    const list = tree[cate];
    for (const node of list) {
      const infoRes = parsePackageName(node.name)
      if (infoRes.err) {
        log(`Warning:Can't parse ${node.name} for package info`)
        continue
      }
      const info = infoRes.unwrap()

      if (info.name == name) {
        return new Ok({
          fileName: node.name,
          url: path.join(root, cate, node.name),
          totalSize: node.size,
          integrity: node.integrity,
        });
      }
    }
  }

  return new Err(`Error:Can't find plugin ${name} in mirror`);
}

export { eptInstall };
