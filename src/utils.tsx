import {Err, Ok, Result} from "ts-results";
import {ParsedFullName} from "@/class";
import bridge from "@/bridge";

function log(text: string) {
  const s = text.split(":")
  if (s.length > 1) {
    switch (s[0]) {
      case "Info":
        console.log(text)
        bridge("log", "Info", text)
        break
      case "Warning":
        bridge("log", "Warning", text)
        // electronLog.warn(text)
        console.warn(text)
        break
      case "Error":
        bridge("log", "Error", text)
        // electronLog.error(text)
        console.error(text)
        break
      default:
        bridge("log", "Info", text)
        // electronLog.info(text)
        console.log(text)
        break
    }
  } else {
    bridge("log", "Info", text)
    console.log(text)
  }
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
  parsePluginName,
  log,
  formatSize,
};
