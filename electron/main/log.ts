import electronLog from "electron-log";
import path from "path";

type LogLevel = "Info" | "Warning" | "Error";

const date = new Date();

electronLog.transports.file.resolvePath = () =>
  path.join(
    process.cwd(),
    "log",
    `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}.txt`
  );

const map: Record<LogLevel, any> = {
  Info: electronLog.info,
  Warning: electronLog.warn,
  Error: electronLog.error,
};

function log(level: LogLevel, content: string) {
  map[level](content);
}

export default log;
