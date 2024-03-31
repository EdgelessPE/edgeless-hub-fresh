import bridge from "@/bridge/method";
import { Res } from "../../electron/main/type";
import { KernelLocal } from "../../types";

export async function genFlashInfo(): Promise<Res<KernelLocal[]>> {
  return bridge("genFlashInfo");
}
