import { UninstallPackage, UninstallPackageParams } from "./UninstallPackage";
import * as fs from "fs";
import * as path from "path";
import { generateTimestamp } from "./utils";
import { mkdir } from "../../utils/shell";

const testList = [
  "Vscode_114514_.7z_14514.7z",
  "Chrome_108.0.5359.99_Cno（bot）.7zfl",
  "你是/一个一个/3号池沼插件包aaa.7zlf",
];
test("uninstallModule", async () => {
  const source = "D:\\Edgeless\\Resource\\Chrome_108.0.5359.99_Cno（bot）.7z";
  const strategy: UninstallPackageParams["strategy"] = "FlashRecycle";

  const parentDir = path.dirname(source);
  const curTimestamp = generateTimestamp();
  for (const file of testList) {
    const target = path.join(parentDir, file);
    mkdir(path.dirname(target));
    if (!fs.existsSync(target)) fs.cpSync(source, target);

    const instance = new UninstallPackage({
      targetFilePath: target,
      strategy,
    });
    instance.listen((type, payload, allowedCommands) => {
      console.log(`File ${file}`, type, payload, allowedCommands);
    });
    const res = await instance.start();
    console.log(`File ${file}`, res);

    const fileName = path.basename(target);
    const ext = path.extname(fileName);
    const base = fileName.substring(0, fileName.length - ext.length);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (strategy == "FlashRecycle") {
      expect(
        fs.existsSync(
          path.join(parentDir, "过期插件包", `${base}.7zf_${curTimestamp}`)
        )
      ).toBe(true);
    } else {
      expect(fs.existsSync(target)).toBe(false);
    }
  }
});
