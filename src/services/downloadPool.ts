import { AbstractPoolNode } from "../../types/download";
import { useObservable } from "@/bridge/useObservable";

function useAbstractPool() {
  return useObservable<AbstractPoolNode[]>("downloadAbstractPool", []);
}

export { useAbstractPool };
