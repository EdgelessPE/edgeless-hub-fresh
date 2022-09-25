import { Button, Input, Layout } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { IconArrowLeft, IconSearch } from "@arco-design/web-react/icon";
import { BrowserHistory } from "history";
import { DownloadPopoverCard } from "@/components/layout/DownloadPopoverCard";
import { iconMapCategory, iconTitleMapSider } from "@/constants";
import { DownloadSpeedBadge } from "@/components/organisms/DownloadSpeedBadge";
import { PageHeaderWithIcon } from "@/components/molecules/PageHeaderWithIcon";
import { getRouterPath } from "@/router/utils";

interface Prop {
  history: BrowserHistory;
}

function renderHeader(
  setTitle: React.Dispatch<React.SetStateAction<string | JSX.Element | null>>
) {
  const s = getRouterPath();
  const renderSubTitle = (title: string) => {
    if (
      title == "任务" ||
      title == "写入" ||
      title == "升级" ||
      title == "内测"
    ) {
      return <DownloadSpeedBadge />;
    }
    if (title == "配置") {
      return `当前参考版本：Beta 4.1.0`;
    }
    if (title == "搜索") {
      return `找到14个相关内容`;
    }

    return undefined;
  };
  // 渲染
  if (s[0] == "plugin") {
    if (s[1] == "category") {
      const category = s[2];
      setTitle(
        <PageHeaderWithIcon
          title={category}
          icon={iconMapCategory[category]}
          subTitle={`共9个插件包`}
        />
      );
    } else if (s[1] == "detail")
      setTitle(<PageHeaderWithIcon title="插件详情" />);
  } else if (s[0] == "search") {
    setTitle(
      <PageHeaderWithIcon
        title="搜索"
        icon={<IconSearch />}
        subTitle={`找到14个相关结果`}
      />
    );
  } else {
    //尝试匹配为侧边栏标题
    const m = iconTitleMapSider[s.join("/")];
    if (m != null) {
      setTitle(
        <PageHeaderWithIcon
          title={m.title}
          icon={m.icon}
          subTitle={renderSubTitle(m.title)}
        />
      );
    } else {
      setTitle(null);
    }
  }
}

export const Header = ({ history }: Prop) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState<JSX.Element | string | null>(null);
  const [displayBack, setDisplayBack] = useState(false);

  const toggleInput = () => setShowSearch((prev) => !prev);
  const onInput = (v: string) => setSearchText(v);
  const onSearch = () => {
    setSearchText("");
    setShowSearch(false);

    if (searchText != "") history.push(`/search/${searchText}`);
  };

  useEffect(() => {
    //路由发生变化时配置Header
    history.listen(() => {
      setDisplayBack(true);
      renderHeader(setTitle);
    });
    //首屏渲染一次
    renderHeader(setTitle);
  }, []);

  return (
    <Layout.Header className="header">
      <div
        style={{ display: title == null ? "none" : "flex" }}
        className="header__title"
      >
        <Button
          type="text"
          onClick={history.back}
          disabled={!displayBack}
          style={{ cursor: displayBack ? "pointer" : "auto" }}
        >
          <IconArrowLeft
            className="header__title__back-button"
            style={{ color: displayBack ? "#108ee9" : "gray" }}
          />
        </Button>
        {title}
      </div>

      {showSearch ? (
        <Input.Search
          value={searchText}
          allowClear
          placeholder="搜索插件"
          onBlur={toggleInput}
          onChange={onInput}
          onSearch={onSearch}
          className="header__searchbar"
        ></Input.Search>
      ) : (
        <Button type="text" onClick={toggleInput}>
          <IconSearch className="header__button" />
        </Button>
      )}
      <DownloadPopoverCard />
    </Layout.Header>
  );
};
