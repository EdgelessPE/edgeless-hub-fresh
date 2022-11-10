import { SeqNode } from "./Sequence";

const SEQUENCE_SINGLE_KEYS = {
  produce: {
    burn: "_seq_single_produce_burn",
    update: "_seq_single_produce_update",
    alpha: "_seq_single_produce_alpha",
  },
};

const SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP: Record<
  string,
  () => SeqNode[]
> = {};
const SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP: Record<string, () => SeqNode[]> =
  {};

export {
  SEQUENCE_SINGLE_KEYS,
  SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP,
  SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP,
};
