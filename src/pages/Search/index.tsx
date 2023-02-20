import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FileNodePackageOnlineWithCategory,
  searchHandler,
} from "@/pages/Search/searchHandler";
import PluginCard from "@/pages/Category/PluginCard";
import { Empty } from "@arco-design/web-react";

export const Search = () => {
  const { query } = useParams() as { query: string };
  const [data, setData] = useState<FileNodePackageOnlineWithCategory[]>([]);

  useEffect(() => {
    searchHandler(query).then(setData);
  }, [query]);

  return (
    <>
      {data.length === 0 && (
        <Empty description={`没有找到与'${query}'相关的结果`} />
      )}
      {data.length > 0 && (
        <div className="category__container">
          {data.map((info) => (
            <PluginCard
              key={info.name + info.category}
              data={info}
              category={info.category}
            />
          ))}
        </div>
      )}
    </>
  );
};
