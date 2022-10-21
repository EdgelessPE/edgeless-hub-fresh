import {Err, Ok, Result} from "ts-results";
import {Integrity} from "../../../../types";
import sha256 from "./sha256";
import blake3 from "./blake3";

type IntegrityValidator = (filePath: string) => Promise<Result<string, string>>
type IntegrityMethod = Integrity["method"]

const registerMap: {
  method: IntegrityMethod,
  entrance: IntegrityValidator
}[] = [
  {
    method: "blake3",
    entrance: blake3
  },
  {
    method: "sha256",
    entrance: sha256
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
