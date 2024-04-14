import bridge from "@/bridge/method";
import { Res } from "../../electron/main/type";
import { KernelLocal } from "../../types";
import { FlashInfo } from "../../types/local";
import { useObservable } from "@/bridge/useObservable";

export async function getPossibleMounts(): Promise<Res<KernelLocal[]>> {
  return bridge("getPossibleMounts");
}
export async function changeFlashGlobal(mount: string) {
  return bridge("changeFlashGlobal", mount);
}
export function getFlashGlobalSubject() {
  return useObservable<Res<FlashInfo>>("flashGlobalSubject");
}
