import blake3 from "./blake3";
import {Err, Ok, Result} from "ts-results";
import {Integrity} from "../../../../types";

type IntegrityValidator = (filePath: string) => Promise<Result<string, string>>
type IntegrityMethod = Integrity["method"]

const registerMap: {
  method: IntegrityMethod,
  entrance: IntegrityValidator
}[] = [
  {
    method: "blake3",
    entrance: blake3
  }
]

export function getIntegrityCalculator(method: IntegrityMethod): Result<IntegrityValidator, string> {
  for (const node of registerMap) {
    if (node.method == method) {
      return new Ok(node.entrance)
    }
  }
  return new Err(`Error:Can't find integrity calculator for method ${method}`)
}
