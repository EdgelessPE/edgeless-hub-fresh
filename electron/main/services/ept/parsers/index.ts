import { Err, Result } from "ts-results";
import { HelloResponse } from "../../../../../types/online";
import axios from "axios";
import path from "path";
import { parsers } from "./_register";
import { validate } from "../../../utils";

export default async function (
  baseUrl: string
): Promise<Result<HelloResponse, string>> {
  let hello: HelloResponse;
  try {
    const res = await axios.get<HelloResponse>(path.join(baseUrl, "hello"));
    hello = res.data;
  } catch (e) {
    return new Err(
      `Error:Can't shake hand with mirror at ${baseUrl} : ${JSON.stringify(e)}`
    );
  }

  if (typeof hello.protocol != "string") {
    return new Err(`Error:Can't get protocol of mirror at ${baseUrl}`);
  }

  for (const node of parsers) {
    if (node.supportedProtocols.includes(hello.protocol)) {
      return validate(hello, node.validator);
    }
  }

  // 没有可用的协议校验器
  return new Err(
    `Error:Can't find protocol parser for ${hello.protocol}, declared by mirror at ${baseUrl}`
  );
}
