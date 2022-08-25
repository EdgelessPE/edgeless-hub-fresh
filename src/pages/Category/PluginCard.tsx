import {Card, Tooltip} from "@arco-design/web-react";
import {CiCircleOutlined} from "@ant-design/icons";
import {NaiveDescription} from "@/components/molecules/NaiveDescription";
import React from "react";
import {PluginData} from "@/class";
import {formatSize, log, parsePluginName} from "@/utils";
import {PluginSmartButton} from "@/components/organisms/PluginSmartButton";
import {myHistory} from "@/router/history";

interface Prop {
  data: PluginData;
  category: string;
  showCategory?: boolean;
}

function renderTitle(title: string, ci: boolean, category: string, fullName: string): React.ReactElement {
  return (
    <>
      <Tooltip key={title + "_tooltip-title"} content={title}>
        <b style={{cursor: "pointer"}}
           onClick={() => myHistory.push(`/plugin/detail/${category}/${fullName}`)}>{title + " "}</b>
      </Tooltip>
      {ci && (
        <Tooltip key={title + "_tooltip-ci"} content={
          <>此插件包由 <a className="category__card__title__bot-link">Edgeless Bot</a> 自动构建</>
        }>
          <CiCircleOutlined className="category__card__title__ci"/>
        </Tooltip>
      )}
    </>
  )
}

const PluginCard = ({data, category, showCategory = false}: Prop) => {
  const nameInfoRes = parsePluginName(data.name)
  if (nameInfoRes.err) {
    log(nameInfoRes.val)
    return <></>
  }
  const nameInfo = nameInfoRes.unwrap()
  let description: any = {
    "版本号": nameInfo.version,
    "打包者": nameInfo.author,
    "大小": formatSize(data.size)
  }

  if (showCategory) {
    description = {
      "分类": category,
      ...description,
    }
  }

  return (
    <Card
      className="category__card"
      style={showCategory ? {height: "180px"} : {height: "160px"}}
      title={renderTitle(nameInfo.name, nameInfo.isBot, category, data.name)}
      extra={[<PluginSmartButton key="action" info={nameInfo} category={category}/>]}
      hoverable
    >
      <NaiveDescription kvMap={description} keyWidth="81px" rowHeight="10px" addColon={true}/>
    </Card>
  )
}

export default PluginCard
