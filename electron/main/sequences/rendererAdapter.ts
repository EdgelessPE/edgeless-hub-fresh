import { RendererSequence } from "../../../types/sequence";
import {
  addMultiSequencePoolEntry,
  getMultiSequencesPoolEntries,
  getSingleSequencePoolEntry,
  IPoolNode,
  prepareSingleSequencePoolEntry,
  removeMultiSequencePoolEntry,
  resetMultiSequencePoolEntry,
  resetSingleSequencePoolEntry,
} from "./pool";
import { Observable, Subject } from "rxjs";
import { Current } from "./Sequence";
import { log } from "../log";

const globalMultiSequencesView: {
  cache: Record<string, RendererSequence[]>;
  subject: Subject<string>; // 发送哪个 key 上的视图缓存有更新
} = {
  cache: {},
  subject: new Subject(),
};

/**
 * 将序列池的具象化结果适配为渲染进程可用的序列视图
 * @param entry 具象化池节点
 * @param patch 用于在更新原先结果时降低算法复杂度
 * @return 渲染进程可用的序列视图
 */
function adapter(
  entry: IPoolNode,
  patch?: { cache: RendererSequence; current: Current }
): RendererSequence {
  if (patch == null) {
    const current = entry.sequence.getCurrent();
    return {
      id: entry.id,
      stepNames: entry.params.seq.map((seq) => seq.name),
      current: current
        ? {
            name: current.name,
            state: current.state,
            allowedCommands: current.allowedCommands,
          }
        : null,
    };
  } else {
    const { cache, current } = patch;
    return {
      id: cache.id,
      stepNames: cache.stepNames,
      current,
    };
  }
}

/**
 * 查询是否已存在一个正在进行中的单行序列
 * @param key 序列key
 */
function hasActiveSingleSequence(key: string): boolean {
  return getSingleSequencePoolEntry(key).some;
}

/**
 * 启动单行序列
 * @param key 单一序列键值
 * @param userInput 用户输入
 * @param reset 是否重置原有序列
 */
async function startSingleSequence(
  key: string,
  userInput?: unknown,
  reset = false
): Promise<Observable<RendererSequence>> {
  const callFn = reset
    ? resetSingleSequencePoolEntry
    : prepareSingleSequencePoolEntry;
  const seq = await callFn(key, userInput);
  let cache: RendererSequence = adapter(seq);
  // 启动序列
  if (seq.sequence.getCurrent() == null) {
    seq.sequence.start().then((res) => {
      if (res.err) {
        log(`Error:Sequence ${key} returned with error : ${res.val}`);
      } else {
        log(`Info:Sequence ${key} executed successfully`);
      }
    });
  }

  return new Observable<RendererSequence>((subscriber) => {
    seq.sequence.listenCurrent((current) => {
      cache = adapter(seq, { cache, current });
      subscriber.next(cache);
    });
  });
}

function getMSCache(key: string): RendererSequence[] {
  if (globalMultiSequencesView.cache[key] == null) {
    globalMultiSequencesView.cache[key] = [];
  }
  return globalMultiSequencesView.cache[key];
}

function setMSCache(key: string, cache: RendererSequence[]) {
  globalMultiSequencesView.cache[key] = cache;
  globalMultiSequencesView.subject.next(key);
}

/**
 * 子序列有更新时给并行序列视图进行补丁更新
 * @param key 并行序列 key
 * @param entry 待更新的子序列入口
 * @param current 子序列当前状态
 */
function patchMultiSequencesView(
  key: string,
  entry: IPoolNode,
  current: Current
) {
  const cache = getMSCache(key);
  for (let i = 0; i < cache.length; i++) {
    const node = cache[i];
    if (node.id == entry.id) {
      cache[i] = adapter(entry, { cache: node, current });
      setMSCache(key, cache);
      return;
    }
  }
  log(
    `Error:Fatal:Can't patch ms view ${key} with id ${entry.id} : sequence not found`
  );
}

/**
 * 获取并行序列视图的 Observable 对象
 * @param key 并行序列 key
 */
function viewMultiSequences(key: string): Observable<RendererSequence[]> {
  // 初始化视图缓存
  const entries = getMultiSequencesPoolEntries(key);
  const cache = entries.map((entry) => adapter(entry));
  setMSCache(key, cache);

  // 订阅子序列现状更新
  globalMultiSequencesView.subject.unsubscribe();
  entries.forEach((entry) => {
    entry.sequence.removeListeners();
    entry.sequence.listenCurrent((cur) => {
      patchMultiSequencesView(key, entry, cur);
    });
  });

  // 新建一个 Observable
  return new Observable<RendererSequence[]>((subscriber) => {
    subscriber.next(getMSCache(key));
    globalMultiSequencesView.subject.subscribe((updated) => {
      if (updated == key) {
        subscriber.next(getMSCache(key));
      }
    });
  });
}

/**
 * 新增并行序列
 * @param key 并行序列 key
 * @param userInput 用户输入
 */
function addMultiSequence(key: string, userInput?: unknown) {
  const entry = addMultiSequencePoolEntry(key, userInput);

  const pool = getMSCache(key);
  pool.push(adapter(entry));
  setMSCache(key, pool);

  entry.sequence.listenCurrent((current) => {
    patchMultiSequencesView(key, entry, current);
  });

  // 启动序列
  entry.sequence.start().then((res) => {
    if (res.err) {
      log(
        `Error:Sequence ${entry.id} at ${key} returned with error : ${res.val}`
      );
    } else {
      log(`Info:Sequence ${entry.id} at ${key} executed successfully`);
    }
  });
}

function removeMultiSequence(key: string, id: string) {
  removeMultiSequencePoolEntry(key, id);

  const pool = getMSCache(key);
  for (let i = 0; i < pool.length; i++) {
    const node = pool[i];
    if (node.id == id) {
      pool.splice(i, 1);
      break;
    }
  }
  setMSCache(key, pool);
}

async function resetMultiSequence(
  key: string,
  id: string,
  userInput?: unknown
) {
  const entry = await resetMultiSequencePoolEntry(key, id, userInput);
  entry.sequence.listenCurrent((current) => {
    patchMultiSequencesView(key, entry, current);
  });
  // 启动序列
  entry.sequence.start().then((res) => {
    if (res.err) {
      log(
        `Error:Sequence ${entry.id} at ${key} returned with error : ${res.val}`
      );
    } else {
      log(`Info:Sequence ${entry.id} at ${key} executed successfully`);
    }
  });
}

export {
  hasActiveSingleSequence,
  startSingleSequence,
  viewMultiSequences,
  addMultiSequence,
  removeMultiSequence,
  resetMultiSequence,
};
