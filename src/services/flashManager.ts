import bridge from "@/bridge/method";
import { KernelLocal } from "../../types";
import { FlashInfo } from "../../types/local";
import { useObservable } from "@/bridge/useObservable";
import { Res } from "../../types/res";

export async function getPossibleMounts(): Promise<Res<KernelLocal[]>> {
  return bridge("getPossibleMounts");
}
export async function changeFlashGlobal(mount: string) {
  return bridge("changeFlashGlobal", mount);
}
export function useFlashGlobalSubject() {
  return useObservable<Res<FlashInfo>>("flashGlobalSubject");
}
