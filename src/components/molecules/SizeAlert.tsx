import {Badge} from "@arco-design/web-react";
import React from "react";
import {sizeAlertConstants} from "@/constants";

interface Props {
  size: number
}

export const SizeAlert = ({size}: Props) => {
  const {orange, red} = sizeAlertConstants.single

  if (size > red) return <Badge dot dotStyle={{width: 10, height: 10}} color="red"/>
  else if (size > orange) return <Badge dot dotStyle={{width: 10, height: 10}} color="orange"/>
  else return <Badge dot dotStyle={{width: 10, height: 10}} color="green"/>
}
