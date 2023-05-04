import * as path from "path";
import * as fs from "fs";
import { log } from "../../log";
import { generateTimestamp } from "./utils";

const regex = /^\.7zf_\d+$/;
let maintained = false;

function getOutdatedList(ls: string[], expiryDays: number) {
  const freshTimestamp = generateTimestamp();
  return ls
    .filter((name) => regex.test(path.extname(name)))
    .map((name) => {
      const ext = path.extname(name);
      const s = ext.split("_");
      const daysPassed = freshTimestamp - Number(s[1]);
      return {
        name,
        daysPassed,
      };
    })
    .filter((node) => {
      return node.daysPassed > expiryDays;
    });
}

function maintainFlashCache(flashCacheDirPath: string, expiryDays = 30) {
  if (maintained || !fs.existsSync(flashCacheDirPath)) {
    return;
  }
  maintained = true;
  getOutdatedList(fs.readdirSync(flashCacheDirPath), expiryDays).forEach(
    (node) => {
      const p = path.join(flashCacheDirPath, node.name);
      log(
        `Log:Remove flash cache outdated file ${p} (${node.daysPassed} days ago)`
      );
      fs.unlinkSync(p);
    }
  );
}

export { maintainFlashCache };
