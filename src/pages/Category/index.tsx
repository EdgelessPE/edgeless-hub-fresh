import "./index.scss";
import PluginCard from "@/pages/Category/PluginCard";
import React, { useEffect, useState } from "react";
import { FileNodePackageOnline } from "types/online";
import { useParams } from "react-router-dom";
import { getHello } from "@/services/ept";
import { log } from "@/utils/log";
import { renderSkeletonCards } from "@/pages/Category/SkeletonCard";
import { updateSubTitle } from "@/services/subTitle";
import { cmpPinYin } from "@/utils/sort";
import { BackTop } from "@arco-design/web-react";
import { scrollTop } from "@/utils/scroll";

function renderPluginCards(
  plugins: FileNodePackageOnline[],
  category: string,
  showCategory = false
) {
  const result: React.ReactElement[] = [];
  for (const plugin of plugins.sort((a, b) => cmpPinYin(a.name, b.name))) {
    result.push(
      <PluginCard
        key={plugin.name}
        data={plugin}
        category={category}
        showCategory={showCategory}
      />
    );
  }
  return result;
}

function useCategory(category: string): FileNodePackageOnline[] {
  const [packages, setPackages] = useState<FileNodePackageOnline[]>([]);

  useEffect(() => {
    scrollTop();
    setPackages([]);
    getHello().then((helloRes) => {
      const tree = helloRes.unwrap().plugins?.tree;
      if (tree == null) {
        log(`Error:Current mirror doesn't provide plugins`);
        return;
      }
      if (!(category in tree)) {
        log(
          `Error:Fatal:Category ${category} not exist in current plugins tree`
        );
        return;
      }
      setPackages(tree[category]);
    });
  }, [category]);

  return packages;
}

export const Category = () => {
  const params = useParams() as { category: string };
  const list = useCategory(params.category);

  useEffect(() => {
    updateSubTitle(`${list.length} 个插件包`);
  }, [list]);

  return (
    <div className="category__container">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-ignore*/}
      <BackTop
        target={() =>
          document.getElementsByClassName("category__container").item(0)
        }
      />
      {list.length === 0 && renderSkeletonCards(16)}
      {renderPluginCards(list, params.category)}
    </div>
  );
};
