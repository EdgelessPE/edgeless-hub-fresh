import { getHello } from "@/services/ept";
import { FileNodePackageOnlineWithCategory } from "../../../types/online";

async function searchHandler(
  searchText: string
): Promise<FileNodePackageOnlineWithCategory[]> {
  const helloRes = await getHello();
  if (helloRes.err) {
    return [];
  }
  const { plugins } = helloRes.unwrap();
  if (plugins == null) {
    return [];
  }

  let res: FileNodePackageOnlineWithCategory[] = [];
  for (const cate in plugins.tree) {
    const list = plugins.tree[cate];
    res = res.concat(
      list
        .filter((cur) =>
          cur.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((node) => ({
          ...node,
          category: cate,
        }))
    );
  }

  return res;
}

export { searchHandler };
