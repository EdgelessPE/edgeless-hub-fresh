import { BackTop } from "@arco-design/web-react";
import React from "react";

const BackToTop = () => {
  return (
    <BackTop
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target={() =>
        document.getElementsByClassName("category__container").item(0)
      }
    />
  );
};

export { BackToTop };
