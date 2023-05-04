import { FileNodePackageOnlineWithCategory } from "types/online";
import { getHello } from "@/services/ept";

function randomNum(minNum: number, maxNum: number) {
  maxNum--;
  return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
}

async function getRecommends(
  count: number
): Promise<FileNodePackageOnlineWithCategory[]> {
  const hello = await getHello();
  if (hello.err) {
    return [];
  }
  const { plugins } = hello.unwrap();
  if (plugins == null) {
    return [];
  }

  const categories: string[] = Object.keys(plugins.tree);
  const getOne = (): FileNodePackageOnlineWithCategory => {
    const category = categories[randomNum(0, categories.length)];
    const list = plugins.tree[category];
    const node = list[randomNum(0, list.length)];
    return {
      ...node,
      category,
    };
  };

  const res = [];
  for (let i = 0; i < count; i++) {
    res.push(getOne());
  }
  return res;
}

export { getRecommends };
