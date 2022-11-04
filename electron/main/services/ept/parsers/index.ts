import {Err, Result} from "ts-results";
import {AlphaResponse, HelloResponse} from "../../../../../types/online";
import {getRegisterNode} from "./_register";
import {fetch, joinUrl, validate} from "../../../utils";

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
    (e) => {
      if (e.code == "ERR_BAD_REQUEST") {
        return `Error:Invalid alpha token`;
      } else {
        return `Error:Can't fetch alpha data from mirror at ${baseUrl} : {}`;
      }
    }
  );
  if (alphaRes.err) return alphaRes;
  const alpha = alphaRes.unwrap();

  const parserRes = getRegisterNode(protocol);
  if (parserRes.err) return parserRes;
  const node = parserRes.unwrap();

  return validate(
    alpha,
    node.validators.alpha,
    `Error:Can't validate alpha response from mirror at ${baseUrl} : {}`
  );
}

export { fetchHello, fetchAlpha };
