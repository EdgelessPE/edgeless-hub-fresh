import React, {useEffect} from "react";

interface Props {
  url: string
  style?: React.CSSProperties
  className?: string
}

export const Webview = ({url, style, className}: Props) => {
  useEffect(() => {
    const webview = document.getElementById("webview") as any
    webview.addEventListener("did-stop-loading", () => {
      webview
        .executeJavaScript("document.addEventListener('click', e => {e.preventDefault()})")
        .catch(() => {
        })
    })
  }, [])
  return (
    <webview id="webview" src={url} style={style} className={className}/>
  )
}
