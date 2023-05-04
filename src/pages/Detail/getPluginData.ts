import { FileNodePackageOnline, PluginsOnline } from "../../../types/online";
import { getHello } from "@/services/ept";
import { log } from "@/utils/log";

let treeCache: PluginsOnline["tree"] | null = null;
const dataCacheMap: Map<string, FileNodePackageOnline> = new Map();

async function getPluginData(
  category: string,
  fullName: string
): Promise<FileNodePackageOnline | null> {
  // 加载树缓存
  if (treeCache == null) {
    const helloRes = await getHello();
    const tree = helloRes.unwrap().plugins?.tree;
    if (tree == null) {
      log(`Error:Fatal:Null plugin tree`);
      return null;
    }
    treeCache = tree;
  }

  // 使用 map 获取快速信息缓存
  const key = `${category}_${fullName}`;
  if (dataCacheMap.has(key)) {
    return dataCacheMap.get(key) ?? null;
  }

  // 遍历树
  for (const cate in treeCache) {
    if (cate != category) continue;

    const list = treeCache[cate];
    for (const node of list) {
      if (node.name == fullName) {
        dataCacheMap.set(key, node);
        return node;
      }
    }
  }

  log(
    `Error:Fatal:Can't get plugin data for ${fullName} in ${category} : not found in tree`
  );
  return null;
}

export { getPluginData };
