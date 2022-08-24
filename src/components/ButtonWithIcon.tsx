import React from "react";
import {Button, ButtonProps} from "@arco-design/web-react";

function ButtonWithIcon({
                          icon,
                          text,
                          props,
                          style
                        }: { icon: React.ReactElement, text: string, props?: ButtonProps, style?: React.CSSProperties }): React.ReactElement {
  return (
    <Button className="icon-button" type="text" {...props} style={style}>
      {icon}
      {text}
    </Button>
  )
}

export default ButtonWithIcon
