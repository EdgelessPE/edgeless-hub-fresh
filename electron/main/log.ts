import electronLog from "electron-log";
import * as path from "path";

type LogLevel = "Debug" | "Info" | "Warning" | "Error";

const date = new Date();

electronLog.transports.file.resolvePath = () =>
  path.join(
    process.cwd(),
    "log",
    `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}.txt`
  );

const map: Record<LogLevel, any> = {
  Debug: electronLog.debug,
  Info: electronLog.info,
  Warning: electronLog.warn,
  Error: electronLog.error,
};

function innerLog(level: LogLevel, content: string) {
  map[level](content);
}

function log(text: string) {
  const s = text.split(":");
  if (s.length > 1) {
    switch (s[0]) {
      case "Debug":
        // TODO:仅当在调试模式时才记录 debug 日志
        innerLog("Debug", text);
        break;
      case "Info":
        innerLog("Info", text);
        break;
      case "Warning":
        innerLog("Warning", text);
        break;
      case "Error":
        innerLog("Error", text);
        break;
      default:
        innerLog("Info", text);
        break;
    }
  } else {
    innerLog("Info", text);
  }
}

export { innerLog, log };
