import { Res } from "../../type";
import { DownloadParams } from "../../../../types/download";
import { getHello } from "./cache";
import { Err, Ok } from "ts-results";
import * as path from "path";
import { addMultiSequencePoolEntry, IPoolNode } from "../../sequences/pool";
import { AddPackageUserInput } from "../../../../types/sequencesUserInput";

async function eptInstall(
  name: string,
  options?: {
    load?: boolean; // 是否在安装之后加载
  }
): Promise<Res<IPoolNode>> {
  const infoRes = await eptInfo(name);
  if (infoRes.err) return infoRes;
  const userInput: AddPackageUserInput = {
    downloadParams: infoRes.unwrap(),
  };

  const seqInfo = addMultiSequencePoolEntry("addPackage", userInput);
  return new Ok(seqInfo);
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
      if (node.name == name) {
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
