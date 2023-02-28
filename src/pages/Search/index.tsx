import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { searchHandler } from "@/pages/Search/searchHandler";
import PluginCard from "@/pages/Category/PluginCard";
import { Empty } from "@arco-design/web-react";
import { updateSubTitle } from "@/services/subTitle";
import { FileNodePackageOnlineWithCategory } from "../../../types/online";
import { cmpPinYin } from "@/utils/sort";
import { scrollTop } from "@/utils/scroll";

export const Search = () => {
  const { query } = useParams() as { query: string };
  const [data, setData] = useState<FileNodePackageOnlineWithCategory[]>([]);

  useEffect(() => {
    scrollTop();
    setData([]);
    searchHandler(query).then((data) => {
      setData(data);
      if (data.length > 0) {
        updateSubTitle(`找到${data.length}个结果`);
      }
    });
  }, [query]);

  return (
    <>
      {data.length === 0 && (
        <Empty description={`没有找到与'${query}'相关的结果`} />
      )}
      {data.length > 0 && (
        <div className="category__container">
          {data
            .sort((a, b) => cmpPinYin(a.name, b.name))
            .map((info) => (
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
