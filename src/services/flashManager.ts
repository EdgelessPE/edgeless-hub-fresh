import bridge from "@/bridge/method";
import { Res } from "../../electron/main/type";
import { KernelLocal } from "../../types";
import { Observable } from "rxjs";
import { FlashInfo } from "../../types/local";

export async function getPossibleMounts(): Promise<Res<KernelLocal[]>> {
  return bridge("getPossibleMounts");
}
export async function getObservableFlashInfo(
  mount: string,
): Promise<Res<Observable<Res<FlashInfo>>>> {
  return bridge("getObservableFlashInfo", mount);
}
