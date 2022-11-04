import {ValidateFunction} from "ajv";

interface RegisterNode {
  supportedProtocols: string[];
  validators: {
    hello: ValidateFunction;
    alpha: ValidateFunction;
  };
}

export {RegisterNode};
