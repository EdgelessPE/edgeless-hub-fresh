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
}

export { RendererSequence };
