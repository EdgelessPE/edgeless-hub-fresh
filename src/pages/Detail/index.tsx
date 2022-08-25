import {useParams} from "react-router-dom";
import "./index.scss"
import {PageHeader} from "@arco-design/web-react";
import {PluginData} from "@/class";
import {parsePluginName} from "@/utils";

function getPluginData(category: string, fullName: string): PluginData {
  return {
    "name": fullName,
    "size": 1782050,
    "timestamp": 1650658154,
    "hash": "1049c47cf533499749b26425befe9149d0f0b4e33dd36f8b420771b127101c94"
  }
}

export const Detail = () => {
  const {category, fullName} = useParams() as { category: string, fullName: string }
  const data = getPluginData(category, fullName)
  const parsedRes = parsePluginName(data.name)
  if (parsedRes.err) {
    return <></>
  }
  const parsed = parsedRes.val
  return (
    <div className="detail__container">
      <PageHeader
        title={parsed.name}
        subTitle={category}
      />
    </div>
  );
};
