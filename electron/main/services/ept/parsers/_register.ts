import {RegisterNode} from "./type";
import Ajv from "ajv";
import helloSchema from "./schemas/protocol310/hello";
import alphaSchema from "./schemas/protocol310/alpha";
import {Err, Ok, Result} from "ts-results";

const ajv = new Ajv();
const helloValidator = ajv.compile(helloSchema);
const alphaValidator = ajv.compile(alphaSchema);

const parsers: RegisterNode[] = [
  {
    supportedProtocols: ["3.1.0"],
    validators: {
      hello: helloValidator,
      alpha: alphaValidator,
    },
  },
];

export function getRegisterNode(
  protocol: string
): Result<RegisterNode, string> {
  for (const node of parsers) {
    if (node.supportedProtocols.includes(protocol)) {
      return new Ok(node);
    }
  }
  return new Err(`Error:Can't find protocol parser for ${protocol}`);
}
