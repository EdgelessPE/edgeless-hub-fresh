import React from "react";
import {Button, ButtonProps} from "@arco-design/web-react";

interface Props {
  icon: React.ReactElement,
  text: string,
  props?: ButtonProps,
  style?: React.CSSProperties
}

export const ButtonWithIcon = ({icon, text, props, style}: Props): React.ReactElement => {
  const type = props?.type ?? "text"
  return (
    <Button className="icon-button" type={type} {...props} style={style}>
      {icon}
      {text}
    </Button>
  )
}
