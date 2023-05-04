import "./index.scss";
import { CiCircleOutlined, SmileTwoTone } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Divider,
  List,
  Space,
  Tag,
  Tooltip,
} from "@arco-design/web-react";
import { IconRefresh } from "@arco-design/web-react/icon";
import React, { useEffect, useState } from "react";
import { myHistory } from "@/router/history";
import { useConfig } from "@/services/config";
import { getGreeting } from "@/pages/Home/greeting";
import { getRecommends } from "@/pages/Home/recommends";
import { parsePackageName } from "@/utils/parser";

interface RecommendationNode {
  title: React.ReactNode;
  description: React.ReactNode;
  link: string;
}

export const Home = () => {
  const [displayNotice, setDisplayNotice] = useState(false);
  const config = useConfig();
  const [pluginsRecommendation, setPluginsRecommendation] = useState<
    RecommendationNode[]
  >([]);

  const refreshRecommends = () => {
    getRecommends(5).then((data) => {
      setPluginsRecommendation(
        data.map((node) => {
          const parsed = parsePackageName(node.name).unwrap();
          return {
            title: (
              <Space style={{ width: "100%" }}>
                {parsed.name}
                {parsed.isBot && (
                  <Tooltip
                    content={
                      <>
                        此插件包由{" "}
                        <a className="category__card__title__bot-link">
                          Edgeless Bot
                        </a>{" "}
                        自动构建
                      </>
                    }
                  >
                    <CiCircleOutlined className="category__card__tip__ci" />
                  </Tooltip>
                )}
              </Space>
            ),
            description: (
              <Space style={{ width: "100%" }}>
                <Tag>{node.category}</Tag>
                <Tag color="gray">{parsed.version}</Tag>
              </Space>
            ),
            link: `/plugin/detail/${node.category}/${node.name}`,
          };
        })
      );
    });
  };

  useEffect(refreshRecommends, []);

  return (
    <div className="home">
      {displayNotice && (
        <Space direction="vertical" className="home__notice-container">
          {/*<Alert*/}
          {/*  type='info'*/}
          {/*  title='请尽快升级至新版本 Edgeless Hub'*/}
          {/*  content='1.1.4 版本修复了 Ventoy 启动盘制作后提升找不到盘符的问题'*/}
          {/*  closable*/}
          {/*  closeElement={<a>我知道了</a>}*/}
          {/*/>*/}
          <Alert
            type="info"
            content="1.1.4 版本现已可用👌🏻"
            closable
            closeElement={<a>立即更新</a>}
          />
        </Space>
      )}

      <div
        className="home__bg-container"
        style={{
          height: displayNotice ? "80%" : "100%",
        }}
      >
        <h2 className="home__welcome">
          {config && getGreeting(config.preference.userNick)}
        </h2>
        <div className="home__status">
          <Avatar size={180} className="home__status__avatar">
            <SmileTwoTone />
          </Avatar>
          <h2 className="home__status__h2">你已拥有最新版本的 Edgeless Beta</h2>
          <Space>
            <Tag bordered color="green">
              Beta
            </Tag>
            <Tag bordered color="blue">
              4.1.0
            </Tag>
          </Space>
          <p>去整点新鲜插件？</p>
          <div className="home__status__button">
            <Button>随便看看</Button>
          </div>
        </div>
        <div className="home__plugins-management">
          已安装1个插件
          <Button>管理</Button>
        </div>
        <div className="home__plugins-recommendation">
          <Divider style={{ marginTop: "0" }} />
          随便看看
          <List
            wrapperClassName="home__plugins-recommendation__list"
            bordered={false}
            dataSource={pluginsRecommendation}
            render={(item, index) => {
              if (displayNotice && index > 3) return;
              return (
                <List.Item
                  key={index}
                  onClick={() => myHistory.push(item.link)}
                  // actions={[
                  //   <Button key="btn" onClick={() => myHistory.push(item.link)}>
                  //     查看
                  //   </Button>,
                  // ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                    style={{ cursor: "pointer" }}
                  />
                </List.Item>
              );
            }}
          />
          <Button type="text" onClick={refreshRecommends}>
            <IconRefresh />
            换一批
          </Button>
        </div>
      </div>
    </div>
  );
};
