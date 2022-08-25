interface BridgeRequest {
  id: number,
  functionName: string,
  args: any
}

interface BridgeReply {
  id: number,
  payload: any
}

export {
  BridgeRequest,
  BridgeReply,
};
