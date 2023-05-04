import { SeqNode } from "./Sequence";
import { addPackage } from "./constitutors/addPackage";

const SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP: Record<
  string,
  () => SeqNode<unknown>[]
> = {};
const SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP: Record<
  string,
  () => SeqNode<unknown>[]
> = {
  addPackage,
};

export {
  SEQUENCE_SINGLE_SEQUENCE_CONSTITUTOR_MAP,
  SEQUENCE_MULTI_SEQUENCE_CONSTITUTOR_MAP,
};
