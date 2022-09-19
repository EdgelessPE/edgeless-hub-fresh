import {Err, Ok, Result} from "ts-results";
import {PluginParsedFullName} from "@/../classes";
import bridge from "@/bridge";

function log(text: string) {
  const s = text.split(":");
  if (s.length > 1) {
    switch (s[0]) {
      case "Info":
        console.log(text);
        bridge("log", "Info", text);
        break;
      case "Warning":
        bridge("log", "Warning", text);
        // electronLog.warn(text)
        console.warn(text);
        break;
      case "Error":
        bridge("log", "Error", text);
        // electronLog.error(text)
        console.error(text);
        break;
      default:
        bridge("log", "Info", text);
        // electronLog.info(text)
        console.log(text);
        break;
    }
  } else {
    bridge("log", "Info", text);
    console.log(text);
  }
}

function parsePackageName(
  fullName: string
): Result<PluginParsedFullName, string> {
  let indexOfDot = fullName.lastIndexOf(".");
  const ext = fullName.slice(indexOfDot + 1);

  const s2 = fullName.slice(0, indexOfDot).split("_");
  if (s2.length != 3) {
    const msg = `Error:Can't parse plugin name : ${fullName}`;
    log(msg);
    return new Err(msg);
  }

  let author = s2[2],
    isBot = false;
  if (author.endsWith("（bot）")) {
    isBot = true;
    author = author.slice(0, -5);
  }

  return new Ok({
    name: s2[0],
    version: s2[1],
    author,
    isBot,
    ext,
  });
}

function parsePackageUrl(urlRoot: string, category: string, name: string) {
  return `${urlRoot}/${category}/${name}`;
}

class Size {
  num: number;
  unit: string;

  constructor(num: number, unit: string) {
    this.num = num;
    this.unit = unit;
  }

  toString() {
    return `${this.num} ${this.unit}`;
  }
}

function formatSize(bytes: number, decimalPoints = 2) {
  const units = ["B", "KB", "MB", "GB", "TB"],
    k = 1024;
  if (bytes === 0) return new Size(0, units[0]);
  const size = Math.floor(Math.log(bytes) / Math.log(k));
  return new Size(
    parseFloat(String((bytes / Math.pow(k, size)).toFixed(decimalPoints))),
    units[size]
  );
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const ymd = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
  const cur = new Date();
  const sinceDays = Math.round(
    (cur.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );

  if (sinceDays <= 30) {
    return `${sinceDays}天前`;
  } else {
    return `${ymd.year}-${ymd.month}-${ymd.day}`;
  }
}

export { parsePackageName, parsePackageUrl, log, formatSize, formatTimestamp };
