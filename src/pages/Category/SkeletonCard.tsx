import React from "react";
import { Card, Skeleton } from "@arco-design/web-react";

const SkeletonCard = () => {
  return (
    <Card className="category__card" style={{ height: "160px" }}>
      <Skeleton animation />
    </Card>
  );
};

function renderSkeletonCards(num: number) {
  const arr: React.ReactNode[] = [];
  for (let i = 0; i < num; i++) {
    arr.push(<SkeletonCard key={i} />);
  }
  return arr;
}

export { renderSkeletonCards };
