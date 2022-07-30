interface BridgeRequest {
  id: number,
  functionName: string,
  args: any
}

interface BridgeReply {
  id: number,
  payload: any
}

interface StringKVMap<T> {
  [key: string]: T;
}

export {
  BridgeRequest,
  BridgeReply,
  StringKVMap
};
