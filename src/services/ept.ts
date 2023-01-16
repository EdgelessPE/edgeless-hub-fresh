import { Result } from "ts-results";
import { AlphaResponse, HelloResponse } from "../../types/online";
import bridge from "@/bridge/method";

async function getHello(): Promise<Result<HelloResponse, string>> {
  return bridge("getHello");
}

async function getAlpha(token: string): Promise<Result<AlphaResponse, string>> {
  return bridge("getAlpha", token);
}

export { getHello, getAlpha };
