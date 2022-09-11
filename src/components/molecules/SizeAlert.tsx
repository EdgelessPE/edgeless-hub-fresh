import { Badge } from "@arco-design/web-react";
import React from "react";
import { sizeAlertConstants } from "@/constants";

interface Props {
  size: number;
  disable?: boolean;
}

const dotStyle = { width: 10, height: 10 };

export const SizeAlert = ({ size, disable }: Props) => {
  const { orange, red } = sizeAlertConstants.single;

  if (disable) return <></>;
  if (size > red) return <Badge dot dotStyle={dotStyle} color="red" />;
  else if (size > orange)
    return <Badge dot dotStyle={dotStyle} color="orange" />;
  else return <Badge dot dotStyle={dotStyle} color="green" />;
};
