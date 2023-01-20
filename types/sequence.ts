import { Sequence } from "../electron/main/sequences/Sequence";

interface RendererSequence {
  id: string;
  stepNames: string[];
  current: {
    name: string; // 序列构造函数提供的 name
    state: {
      type: string;
      payload: unknown;
    };
    allowedCommands: string[];
  };
  state: Sequence<unknown>["state"];
}

export { RendererSequence };
