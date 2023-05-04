import { useEffect, useState } from "react";
import { createBridgeObservable } from "@/bridge/observable";

const listenerMap = new Map<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { listeners: ((state: any) => void)[]; lastState: any }
>();

/**
 * 将主线程 bridge 中注册的 Observable 转换为 React 状态
 * @param bridgeKey key
 * @param initialState 初始状态
 */
function useObservable<T>(bridgeKey: string, initialState?: T): T | null {
  const [state, setState] = useState<T | null>(initialState ?? null);

  useEffect(() => {
    // 如果没订阅的先订阅
    if (!listenerMap.has(bridgeKey)) {
      // 在 map 中创建 listener 数组
      listenerMap.set(bridgeKey, {
        listeners: [],
        lastState: initialState ?? null,
      });

      // 新建一个 Observable 并订阅更新
      const obs = createBridgeObservable<T>(bridgeKey);
      obs.subscribe((result) => {
        const entry = listenerMap.get(bridgeKey);
        if (!entry) return;
        entry.listeners.forEach((listener) => {
          listener(result);
        });
        entry.lastState = result;
      });
    } else {
      // 模拟 BehaviorSubject 的行为，发送最新状态
      const entry = listenerMap.get(bridgeKey);
      if (!entry) return;
      setState(entry.lastState);
    }

    // 将本次创建的状态作为监听器加入 map
    const arr = listenerMap.get(bridgeKey)?.listeners || [];
    arr.push(setState);
  }, [bridgeKey]);

  return state;
}

export { useObservable };
