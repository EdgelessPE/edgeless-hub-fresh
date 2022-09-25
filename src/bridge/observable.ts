import { ipcRenderer } from "electron";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ObservableBridgeUpdate } from "../../types/bridge";
import { log } from "@/utils/log";

type Listener = (update: ObservableBridgeUpdate) => void;

const listenerMap = new Map<string, Listener>();

function initObservableBridge() {
  ipcRenderer.on(
    "_bridge_observable-update",
    (event, value: ObservableBridgeUpdate) => {
      if (!listenerMap.has(value.key)) {
        log(
          `Error:Fatal:Receive unknown observable update, key : ${value.key}`
        );
        return;
      }
      const callback = listenerMap.get(value.key)!;
      callback(value);
    }
  );
}

function addListener(key: string, listener: Listener) {
  if (listenerMap.has(key)) {
    log(`Warning:Duplicated listener add call : ${key}`);
  }
  listenerMap.set(key, listener);
}

function createBridgeObservable<T>(key: string): Observable<T> {
  ipcRenderer.send("_bridge_observable-subscribe", key);
  return new Observable<T>((subscriber) => {
    const listener: Listener = (update) => {
      switch (update.type) {
        case "next":
          subscriber.next(update.value);
          break;
        case "error":
          subscriber.error(update.value);
          break;
        case "complete":
          subscriber.complete();
          break;
      }
    };
    addListener(key, listener);
  });
}

function createBridgeSubject<T>(key: string): Subject<T | null> {
  ipcRenderer.send("_bridge_observable-subscribe", key);
  const subject = new BehaviorSubject<T | null>(null);
  const listener: Listener = (update) => {
    switch (update.type) {
      case "next":
        subject.next(update.value);
        break;
      case "error":
        subject.error(update.value);
        break;
      case "complete":
        subject.complete();
        break;
    }
  };
  addListener(key, listener);
  return subject;
}

export { createBridgeObservable, createBridgeSubject, initObservableBridge };
