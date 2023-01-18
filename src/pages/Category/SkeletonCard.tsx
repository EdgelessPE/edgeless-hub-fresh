import React from "react";
import { Card, Skeleton } from "@arco-design/web-react";

const SkeletonCard = () => {
  return (
    <Card className="category__card" style={{ height: "160px" }}>
      <Skeleton animation />
    </Card>
  );
};

export { SkeletonCard };
