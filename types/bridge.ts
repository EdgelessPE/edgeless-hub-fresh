interface ObservableBridgeUpdate {
  key: string;
  type: "next" | "error" | "complete";
  value: any;
}

interface BridgeRequest {
  id: number;
  functionName: string;
  args: any;
}

interface BridgeReply {
  id: number;
  payload: any;
}

export { ObservableBridgeUpdate, BridgeRequest, BridgeReply };
