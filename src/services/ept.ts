import { Result } from "ts-results";
import { AlphaResponse, HelloResponse } from "../../types/online";
import bridge from "@/bridge/method";
import { Res } from "../../electron/main/type";

async function getHello(): Promise<Result<HelloResponse, string>> {
  return bridge("getHello");
}

async function getAlpha(token: string): Promise<Result<AlphaResponse, string>> {
  return bridge("getAlpha", token);
}

async function eptInstall(
  name: string,
  options?: {
    load?: boolean; // 是否在安装之后加载
  }
): Promise<Res<string>> {
  return bridge("eptInstall", name, options);
}

export { getHello, getAlpha, eptInstall };
