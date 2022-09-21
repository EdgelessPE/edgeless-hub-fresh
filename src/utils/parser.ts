import { Err, Ok, Result } from "ts-results";
import { PluginParsedFullName } from "types/index";
import { log } from "@/utils/log";

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

export { parsePackageUrl, parsePackageName };
