import { SeqNode, Sequence } from "./Sequence";
import { None, Option, Some } from "ts-results";
import {
  SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP,
  SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP,
} from "./constants";
import { log } from "../log";

interface IPoolNode {
  id: string;
  params: {
    seq: SeqNode[];
    userInput: unknown;
  };
  sequence: Sequence;
}

interface IPool {
  single: Map<string, IPoolNode>;
  multi: Map<string, IPoolNode[]>;
}

const Pool: IPool = {
  single: new Map(),
  multi: new Map(),
};

let multiSequenceCount = 0;

function getSingleSequencePoolEntry(key: string): Option<IPoolNode> {
  const entry = Pool.single.get(key);
  if (entry != null) {
    return new Some(entry);
  } else {
    return None;
  }
}

/**
 * 使单行序列存在入口，返回现有入口或新建入口并返回
 * @param key 单一序列键值
 * @param userInput 用户输入
 */
function prepareSingleSequencePoolEntry(
  key: string,
  userInput?: unknown
): IPoolNode {
  const entryOpt = getSingleSequencePoolEntry(key);
  if (entryOpt.some) {
    return entryOpt.unwrap();
  } else {
    const sequenceConstitutor = SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP[key];
    if (sequenceConstitutor == null) {
      log(`Error:Fatal:Sequence ${key} constructor not registered!`);
      throw "INTERNAL";
    }

    const seqNodes = sequenceConstitutor();
    const sequence = new Sequence(seqNodes, userInput);
    const entry: IPoolNode = {
      id: key,
      params: {
        seq: seqNodes,
        userInput,
      },
      sequence,
    };
    Pool.single.set(key, entry);

    return entry;
  }
}

async function resetSingleSequencePoolEntry(
  key: string,
  userInput?: unknown
): Promise<IPoolNode> {
  let finalUserInput: unknown = userInput;

  const oldEntryOpt = getSingleSequencePoolEntry(key);
  if (oldEntryOpt.some) {
    const entry = oldEntryOpt.unwrap();

    // 尝试停止旧序列执行
    const cRes = await entry.sequence.cancel();
    if (cRes.err) {
      log(`Warning:Can't cancel sequence ${key} before reset : ${cRes.val}`);
    }

    // 从旧序列读取可能的用户输入
    if (finalUserInput === undefined) {
      finalUserInput = entry.params.userInput;
    }
  }

  // 重置序列
  Pool.single.set(key, null);
  return prepareSingleSequencePoolEntry(key, finalUserInput);
}

function getMultiSequencesPoolEntries(key: string): IPoolNode[] {
  const entry = Pool.multi.get(key);
  if (entry != null) {
    return entry;
  } else {
    const emptyEntry = [];
    Pool.multi.set(key, emptyEntry);
    return emptyEntry;
  }
}

function getMultiSequencePoolEntry(key: string, id: string): Option<IPoolNode> {
  const entryFindRes = getMultiSequencesPoolEntries(key).find(
    (value) => value.id == id
  );

  if (entryFindRes == null) {
    return None;
  } else {
    return new Some(entryFindRes);
  }
}

/**
 * 添加一条并行序列
 * @param key 序列所在集合键值
 * @param userInput 用户输入
 * @param replaceId 如果是重置序列则传入将被复用的 id
 * @return 序列id
 */
function addMultiSequencePoolEntry(
  key: string,
  userInput?: unknown,
  replaceId?: string
): IPoolNode {
  const sequenceConstitutor = SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP[key];
  if (sequenceConstitutor == null) {
    log(`Error:Fatal:Sequence ${key} constructor not registered!`);
    throw "INTERNAL";
  }

  const seqNodes = sequenceConstitutor();
  const sequence = new Sequence(seqNodes, userInput);
  const id = replaceId ?? `_seq_multi_${key}_${multiSequenceCount++}`;
  const entry: IPoolNode = {
    id,
    params: {
      seq: seqNodes,
      userInput,
    },
    sequence,
  };

  getMultiSequencesPoolEntries(key).push(entry);

  return entry;
}

function removeMultiSequencePoolEntry(key: string, id: string) {
  const entries = getMultiSequencesPoolEntries(key);
  const findRes = entries.find((value, index) => {
    if (value.id == id) {
      value.sequence.removeListeners();
      value.sequence.cancel().then((res) => {
        if (res.err) {
          log(
            `Warning:Can't cancel sequence ${id} at ${key} before remove : ${res.val}`
          );
        }
      });
      entries.splice(index, 1);
      return true;
    }
  });
  if (findRes == null) {
    log(
      `Warning:Trying to delete a unknown multi sequence ${id} from ${key} set `
    );
  }
}

async function resetMultiSequencePoolEntry(
  key: string,
  id: string,
  userInput?: unknown
): Promise<IPoolNode> {
  let finalUserInput: unknown = userInput;

  const entryOpt = getMultiSequencePoolEntry(key, id);
  if (entryOpt.some) {
    const entry = entryOpt.unwrap();
    const cRes = await entry.sequence.cancel();
    if (cRes.err) {
      log(
        `Warning:Can't cancel sequence ${id} at ${key} before reset : ${cRes.val}`
      );
    }
    removeMultiSequencePoolEntry(key, id);
    if (finalUserInput === undefined) {
      finalUserInput = entry.params.userInput;
    }
  }

  return addMultiSequencePoolEntry(key, finalUserInput, id);
}

export {
  getSingleSequencePoolEntry,
  prepareSingleSequencePoolEntry,
  resetSingleSequencePoolEntry,
  getMultiSequencesPoolEntries,
  getMultiSequencePoolEntry,
  addMultiSequencePoolEntry,
  removeMultiSequencePoolEntry,
  resetMultiSequencePoolEntry,
  IPoolNode,
};
