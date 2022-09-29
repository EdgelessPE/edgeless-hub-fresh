import { RegisterNode } from "./types";
import Ajv from "ajv";
import helloSchema from "./schemas/protocol310.json";

const ajv = new Ajv();
const helloValidator = ajv.compile(helloSchema);

export const parsers: RegisterNode[] = [
  {
    supportedProtocols: ["3.1.0"],
    validator: helloValidator,
  },
];
