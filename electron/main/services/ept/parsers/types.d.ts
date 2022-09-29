import { ValidateFunction } from "ajv";

interface RegisterNode {
  supportedProtocols: string[];
  validator: ValidateFunction;
}

export { RegisterNode };
