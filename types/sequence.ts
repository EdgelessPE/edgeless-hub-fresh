import { Sequence } from "../electron/main/sequences/Sequence";

interface RendererSequence {
  id: string;
  stepNames: string[];
  current: {
    name: string;
    state: {
      type: string;
      payload: unknown;
    };
    allowedCommands: string[];
  };
  state: Sequence<unknown>["state"];
}

export { RendererSequence };
