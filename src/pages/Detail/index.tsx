import { useParams } from "react-router-dom";
import "./index.scss";
import {
  Divider,
  PageHeader,
  Popover,
  Statistic,
  Tag,
} from "@arco-design/web-react";
import { formatSize, formatTimestamp, parsePackageName } from "@/utils";
import { PluginSmartButton } from "@/components/organisms/PluginSmartButton";
import React from "react";
import { Webview } from "@/components/organisms/Webview";
import { SizeAlert } from "@/components/molecules/SizeAlert";
import { FileNodePackageOnline } from "@/classes/online";

function getPluginData(
  category: string,
  fullName: string
): FileNodePackageOnline {
  return {
    name: fullName,
    size: 1782050,
    timestamp: 1658958154,
  };
}

export const Detail = () => {
  const { category, fullName } = useParams() as {
    category: string;
    fullName: string;
  };
  const data = getPluginData(category, fullName);
  const parsedRes = parsePackageName(data.name);
  if (parsedRes.err) {
    return <></>;
  }
  const parsed = parsedRes.val;
  const size = formatSize(data.size);
  return (
    <div className="detail__container">
      <PageHeader
        className="detail__header"
        title={parsed.name}
        subTitle={parsed.isBot && <Tag color="green">自动构建</Tag>}
        extra={<PluginSmartButton info={parsed} category={category} />}
      />
      <div className="detail__divider">
        <Divider style={{ margin: "0" }} />
      </div>

      <div className="detail__description">
        <Statistic title="版本号" value={parsed.version} />
        <Popover
          title={<b>打包者徽章</b>}
          position="bottom"
          content={
            <div className="detail__badge-wall">
              <Tag color="#00b42a">贡献排名 1</Tag>
              <Tag className="detail__badge" color="red">
                Edgeless官方人员
              </Tag>
              <Tag className="detail__badge" color="green">
                自动构建任务作者
              </Tag>
            </div>
          }
        >
          <div>
            <Statistic title="打包者" value={parsed.author} />
          </div>
        </Popover>
        <Statistic title="更新时间" value={formatTimestamp(data.timestamp)} />
        <Statistic
          title="大小"
          value={size.num}
          suffix={size.unit}
          prefix={<SizeAlert size={data.size} />}
        />
      </div>

      <Webview
        url={"https://www.bing.com/search?q=" + parsed.name}
        className="detail__webview"
      />
    </div>
  );
};
