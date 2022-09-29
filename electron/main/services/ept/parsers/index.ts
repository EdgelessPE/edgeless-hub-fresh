import { Err, Ok, Result } from "ts-results";
import { AlphaResponse, HelloResponse } from "../../../../../types/online";
import { parsers } from "./_register";
import { fetch, joinUrl, validate } from "../../../utils";
import { RegisterNode } from "./types";

function getRegisterNode(protocol: string): Result<RegisterNode, string> {
  for (const node of parsers) {
    if (node.supportedProtocols.includes(protocol)) {
      return new Ok(node);
    }
  }
  return new Err(`Error:Can't find protocol parser for ${protocol}`);
}

async function fetchHello(
  baseUrl: string
): Promise<Result<HelloResponse, string>> {
  const helloRes = await fetch<HelloResponse>(
    joinUrl(baseUrl, "hello"),
    `Error:Can't shake hand with mirror at ${baseUrl} : {}`
  );
  if (helloRes.err) return helloRes;
  const hello = helloRes.unwrap();

  if (typeof hello.protocol != "string") {
    return new Err(`Error:Can't get protocol of mirror at ${baseUrl}`);
  }

  const parserRes = getRegisterNode(hello.protocol);
  if (parserRes.err) return parserRes;
  const node = parserRes.unwrap();

  return validate(
    hello,
    node.validators.hello,
    `Error:Can't validate hello response with mirror at ${baseUrl} : {}`
  );
}

async function fetchAlpha(
  protocol: string,
  baseUrl: string,
  token: string
): Promise<Result<AlphaResponse, string>> {
  const alphaRes = await fetch<AlphaResponse>(
    joinUrl(baseUrl, `alpha?token=${token}`),
    `Error:Can't fetch alpha data hand with mirror at ${baseUrl} : {}`
  );
  if (alphaRes.err) return alphaRes;
  const alpha = alphaRes.unwrap();

  const parserRes = getRegisterNode(protocol);
  if (parserRes.err) return parserRes;
  const node = parserRes.unwrap();

  return validate(
    alpha,
    node.validators.alpha,
    `Error:Can't validate alpha response with mirror at ${baseUrl} : {}`
  );
}

export { fetchHello, fetchAlpha };
