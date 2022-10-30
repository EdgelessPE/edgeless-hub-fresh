import electronLog from "electron-log";
import path from "path";

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
        // console.log(text);
        innerLog("Debug", text);
        break;
      case "Info":
        // console.log(text);
        innerLog("Info", text);
        break;
      case "Warning":
        innerLog("Warning", text);
        // console.warn(text);
        break;
      case "Error":
        innerLog("Error", text);
        // console.error(text);
        break;
      default:
        innerLog("Info", text);
        // console.log(text);
        break;
    }
  } else {
    innerLog("Info", text);
    // console.log(text);
  }
}

export { innerLog, log };
