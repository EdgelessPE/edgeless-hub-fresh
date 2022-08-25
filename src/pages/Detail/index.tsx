import {useParams} from "react-router-dom";
import "./index.scss"
import {PageHeader, Statistic, Tag} from "@arco-design/web-react";
import {PluginData} from "@/class";
import {formatSize, formatTimestamp, parsePluginName} from "@/utils";
import {PluginSmartButton} from "@/components/organisms/PluginSmartButton";

function getPluginData(category: string, fullName: string): PluginData {
  return {
    "name": fullName,
    "size": 1782050,
    "timestamp": 1658958154,
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
  const size = formatSize(data.size)
  return (
    <div className="detail__container">
      <PageHeader
        className="detail__header"
        title={parsed.name}
        subTitle={parsed.isBot && <Tag color="green">自动构建</Tag>}
        extra={<PluginSmartButton info={parsed} category={category}/>}
      >
        <div className="detail__description">
          <Statistic
            title="版本号"
            value={parsed.version}
          />
          <Statistic
            title="作者"
            value={parsed.author}
          />
          <Statistic
            title="更新时间"
            value={formatTimestamp(data.timestamp)}
          />
          <Statistic
            title="大小"
            value={size.num}
            suffix={size.unit}
          />
        </div>
      </PageHeader>
    </div>
  );
};
