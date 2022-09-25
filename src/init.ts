import { initObservableBridge } from "@/bridge/observable";
import { initConfig } from "@/services/config";

export default async function () {
  initObservableBridge();
  await initConfig();
}
