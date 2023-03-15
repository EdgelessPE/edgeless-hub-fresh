import { Tag } from "@arco-design/web-react";
import { ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
import { useAbstractPoolStatus } from "@/services/downloadPool";
import { formatSize } from "@/utils/formatter";

export const DownloadSpeedBadge = () => {
  const status = useAbstractPoolStatus();
  return (
    <Tag icon={<ArrowDownOutlined />}>{`${formatSize(
      status?.speed ?? 0
    )}/s`}</Tag>
  );
};
