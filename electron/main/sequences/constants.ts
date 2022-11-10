import { SeqNode } from "./Sequence";
import { addPackage } from "./constitutors/addPackage";

const SEQUENCE_SINGLE_KEYS = {
  produce: {
    burn: "_seq_single_produce_burn",
    update: "_seq_single_produce_update",
    alpha: "_seq_single_produce_alpha",
  },
};

const SEQUENCE_MULTI_KEYS = {
  ept: {
    addPackage: "_seq_multi_ept_addPackage",
  },
};

const SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP: Record<
  string,
  () => SeqNode[]
> = {};
const SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP: Record<string, () => SeqNode[]> =
  {
    _seq_multi_ept_addPackage: addPackage,
  };

export {
  SEQUENCE_SINGLE_KEYS,
  SEQUENCE_MULTI_KEYS,
  SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP,
  SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP,
};
