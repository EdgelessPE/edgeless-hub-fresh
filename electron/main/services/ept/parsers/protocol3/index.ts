import { ParserEntrance } from "../types";
import axios from "axios";
import path from "path";
import Ajv, { ValidateFunction } from "ajv";

import helloSchema from "./schema/hello.json";
import { Err, Ok, Result } from "ts-results";
import { HelloResponse } from "../../../../../../types/online";

const ajv = new Ajv();
const helloValidator = ajv.compile(helloSchema);

function valid(json: any, validator: ValidateFunction): Result<null, string> {
  validator.errors = undefined;
  const res = validator(json);
  if (res) {
    return new Ok(null);
  } else {
    return new Err(
      `Error:Can't valid mirror response : ${JSON.stringify(validator.errors)}`
    );
  }
}

const protocol3Entrance: ParserEntrance = async (baseUrl) => {
  let hello: HelloResponse;
  try {
    const helloResponse = await axios.get<HelloResponse>(
      path.join(baseUrl, "hello")
    );
    const helloValidRes = valid(helloResponse, helloValidator);
    if (helloValidRes.err) return helloValidRes;
    hello = helloResponse.data;
  } catch (e) {
    return new Err(`Error:Can't fetch hello response from mirror`);
  }

  return new Ok(hello);
};

export default protocol3Entrance;
