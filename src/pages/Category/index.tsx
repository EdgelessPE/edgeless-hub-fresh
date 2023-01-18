import "./index.scss";
import PluginCard from "@/pages/Category/PluginCard";
import React, { useEffect, useState } from "react";
import { FileNodePackageOnline } from "types/online";
import { useParams } from "react-router-dom";
import { getHello } from "@/services/ept";
import { log } from "@/utils/log";
import { SkeletonCard } from "@/pages/Category/SkeletonCard";

function renderPluginCards(
  plugins: FileNodePackageOnline[],
  category: string,
  showCategory = false
) {
  const result: React.ReactElement[] = [];
  for (const plugin of plugins) {
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

function renderSkeletonCards(num: number) {
  const arr: React.ReactNode[] = [];
  for (let i = 0; i < num; i++) {
    arr.push(<SkeletonCard key={i} />);
  }
  return arr;
}

function useCategory(category: string): FileNodePackageOnline[] {
  const [packages, setPackages] = useState<FileNodePackageOnline[]>([]);

  useEffect(() => {
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

  return (
    <div className="category__container">
      {list.length === 0 && renderSkeletonCards(16)}
      {renderPluginCards(list, params.category)}
    </div>
  );
};
