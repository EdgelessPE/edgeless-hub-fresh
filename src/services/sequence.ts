import bridge from "@/bridge/method";
import { Observable } from "rxjs";
import { RendererSequence } from "../../types/sequence";

const SEQUENCE_SINGLE_KEYS = {
  produce: {
    burn: "_seq_single_produce_burn",
    update: "_seq_single_produce_update",
    alpha: "_seq_single_produce_alpha",
  },
};

const SEQUENCE_MULTI_KEYS = {
  ept: {
    addPackage: "_seq_multi_ept_addPackage",
  },
};

async function hasActiveSingleSequence(key: string) {
  return bridge<boolean>("hasActiveSingleSequence", key);
}

async function startSingleSequence(
  key: string,
  userInput?: unknown,
  reset = false
) {
  return bridge<Observable<RendererSequence>>(
    "startSingleSequence",
    key,
    userInput,
    reset
  );
}

async function viewMultiSequences(key: string) {
  return bridge<Observable<RendererSequence[]>>("viewMultiSequences", key);
}

async function addMultiSequence(key: string, userInput?: unknown) {
  return bridge<void>("addMultiSequence", key, userInput);
}

async function removeMultiSequence(key: string, id: string) {
  return bridge<void>("removeMultiSequence", key, id);
}

async function resetMultiSequence(
  key: string,
  id: string,
  userInput?: unknown
) {
  return bridge<void>("resetMultiSequence", key, id, userInput);
}

export {
  SEQUENCE_SINGLE_KEYS,
  SEQUENCE_MULTI_KEYS,
  hasActiveSingleSequence,
  startSingleSequence,
  viewMultiSequences,
  addMultiSequence,
  removeMultiSequence,
  resetMultiSequence,
};
