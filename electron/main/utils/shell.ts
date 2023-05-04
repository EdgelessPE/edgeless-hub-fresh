import { log } from "../log";

import * as shell from "shelljs";
import * as fs from "fs";
import * as path from "path";
import { Res } from "../type";
import { Err, Ok } from "ts-results";

function del(p: string): boolean {
  if (!fs.existsSync(p)) {
    log(`Debug:File to be deleted not exist : ${p}`);
    return true;
  }
  shell.rm("-rf", p);
  const finalCheck = fs.existsSync(p);
  if (finalCheck) {
    log(`Warning:Can't delete ${p} : still exist after api call`);
  }
  return !finalCheck;
}

function isFolderPath(p: string): boolean {
  return path.extname(p) == "";
}

function mkdir(p: string): boolean {
  if (fs.existsSync(p)) {
    if (fs.statSync(p).isFile()) {
      log(`Warning:Delete file ${p} discouraging from mkdir`);
      if (!del(p)) {
        return false;
      }
    } else {
      return true;
    }
  }
  fs.mkdirSync(p, { recursive: true });
  return fs.existsSync(p);
}

/**
 * 移动文件
 * @param from 源文件
 * @param to 目标位置
 */
function move(from: string, to: string): Res<string> {
  if (!fs.existsSync(from)) {
    return new Err(`Error:Can't move ${from} to ${to} : source not exist`);
  }
  if (fs.existsSync(to)) {
    log(`Warning:Move would cover target ${to}`);
  }
  if (isFolderPath(to)) {
    // 自动填充末尾的文件名
    const fileName = path.basename(from);
    to = path.join(to, fileName);
  } else {
    // 尝试创建父目录
    const parentDir = path.dirname(to);
    if (!mkdir(parentDir)) {
      return new Err(
        `Error:Can't move ${from} to ${to} : can't mkdir parent dir at ${parentDir}`
      );
    }
  }
  try {
    fs.renameSync(from, to);
  } catch (e) {
    return new Err(
      `Error:Can't move ${from} to ${to} : api call failed : ${JSON.stringify(
        e
      )}`
    );
  }
  if (!fs.existsSync(to)) {
    return new Err(
      `Error:Can't move ${from} to ${to} : target not exist after api call`
    );
  }
  return new Ok(to);
}

export { del, isFolderPath, mkdir, move };
