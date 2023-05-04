interface ObservableBridgeUpdate {
  key: string;
  type: "next" | "error" | "complete";
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

interface BridgeRequest {
  id: number;
  functionName: string;
  args: unknown[];
}

interface BridgeReply {
  id: number;
  payload: unknown;
}

export { ObservableBridgeUpdate, BridgeRequest, BridgeReply };
