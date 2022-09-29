import { RegisterNode } from "./types";
import Ajv from "ajv";
import helloSchema from "./schemas/protocol310/hello.json";
import alphaSchema from "./schemas/protocol310/alpha.json";

const ajv = new Ajv();
const helloValidator = ajv.compile(helloSchema);
const alphaValidator = ajv.compile(alphaSchema);

export const parsers: RegisterNode[] = [
  {
    supportedProtocols: ["3.1.0"],
    validators: {
      hello: helloValidator,
      alpha: alphaValidator,
    },
  },
];
