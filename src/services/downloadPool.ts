import { AbstractPoolStatus } from "../../types/download";
import { useObservable } from "@/bridge/useObservable";

function useAbstractPoolStatus() {
  return useObservable<AbstractPoolStatus>("downloadAbstractPoolStatus");
}

export { useAbstractPoolStatus };
