import React, { useEffect } from "react";
import { log } from "@/utils/log";

interface Props {
  url: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Webview = ({ url, style, className }: Props) => {
  useEffect(() => {
    const webview = document.getElementById("webview") as any;
    webview.addEventListener("did-stop-loading", () => {
      webview
        .executeJavaScript(
          "document.addEventListener('click', e => {e.preventDefault()})"
        )
        .catch(() => {
          log(`Warning:Can't prevent click default event on Webview component`);
        });
    });
  }, []);
  return <webview id="webview" src={url} style={style} className={className} />;
};
