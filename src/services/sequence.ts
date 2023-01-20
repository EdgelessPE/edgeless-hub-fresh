import bridge from "@/bridge/method";
import { Observable } from "rxjs";
import { RendererSequence } from "../../types/sequence";
import { TaskStatus } from "../../types";

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

async function genTaskStatus(
  msPoolKey: string,
  cur: RendererSequence["current"]
): Promise<TaskStatus> {
  return bridge("genTaskStatus", msPoolKey, cur);
}

export {
  hasActiveSingleSequence,
  startSingleSequence,
  viewMultiSequences,
  addMultiSequence,
  removeMultiSequence,
  resetMultiSequence,
  genTaskStatus,
};
