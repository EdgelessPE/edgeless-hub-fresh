import bridge from "@/bridge/method";
import { Res } from "../../electron/main/type";
import { KernelLocal } from "../../types";

export async function getPossibleMounts(): Promise<Res<KernelLocal[]>> {
  return bridge("getPossibleMounts");
}
export async function genFlashInfo(mount: string): Promise<Res<KernelLocal[]>> {
  return bridge("genFlashInfo", mount);
}
