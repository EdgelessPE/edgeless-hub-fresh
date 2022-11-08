import React from "react";
import { Button, ButtonProps } from "@arco-design/web-react";

interface Props {
  icon: React.ReactElement;
  text: string;
  buttonProps?: ButtonProps;
  style?: React.CSSProperties;
}

export const ButtonWithIcon = ({
  icon,
  text,
  buttonProps,
  style,
}: Props): React.ReactElement => {
  const type = buttonProps?.type ?? "text";
  return (
    <Button className="icon-button" type={type} {...buttonProps} style={style}>
      {icon}
      {text}
    </Button>
  );
};
