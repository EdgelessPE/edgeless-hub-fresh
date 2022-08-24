import {StringKVMap} from '../electron/class';
import {Err, Ok, Result} from "ts-results";
// import electronLog from "electron-log"
import {ParsedFullName} from "@/class";

// electronLog.transports.file.resolvePath=()=>path.join(process.cwd(),"log")

function log(text: string) {
  const s = text.split(":")
  if (s.length > 1) {
    switch (s[0]) {
      case "Info":
        // electronLog.info(text)
        console.log(text)
        break
      case "Warning":
        // electronLog.warn(text)
        console.warn(text)
        break
      case "Error":
        // electronLog.error(text)
        console.error(text)
        break
      default:
        // electronLog.info(text)
        console.log(text)
        break
    }
  } else {
    // electronLog.info(text)
    console.log(text)
  }
}

function getQuery(): StringKVMap<string> {
  let match = window.location.href.match(/[?&]\w+=[^?&]+/g);
  if (match == null) return {};
  let res: StringKVMap<string> = {};
  for (let text of match) {
    const s = decodeURI(text).slice(1).split('=');
    res[s[0]] = s[1];
  }
  return res;
}

function parsePluginName(fullName: string): Result<ParsedFullName, string> {
  let indexOfDot = fullName.lastIndexOf(".")
  const ext = fullName.slice(indexOfDot + 1)

  const s2 = fullName.slice(0, indexOfDot).split("_")
  if (s2.length != 3) return new Err(`Error:Can't parse plugin name : ${fullName}`)

  let author = s2[2], isBot = false
  if (author.endsWith("（bot）")) {
    isBot = true
    author = author.slice(0, -5)
  }

  return new Ok({
    name: s2[0],
    version: s2[1],
    author,
    isBot,
    ext
  })
}

function formatSize(bytes: number, decimalPoints = 2) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'],
    k = 1024;
  if (bytes === 0) return `0 ${units[0]}`;
  const size = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat(String((bytes / Math.pow(k, size)).toFixed(decimalPoints)))} ${units[size]}`
}

export {
  getQuery,
  parsePluginName,
  log,
  formatSize,
};
