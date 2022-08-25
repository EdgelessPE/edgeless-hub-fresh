import React from "react";

interface Props {
  url: string
  style?: React.CSSProperties
  className?: string
}

export const Webview = ({url, style, className}: Props) => {
  return (
    <webview id="webview" src={url} style={style} className={className}/>
  )
}
