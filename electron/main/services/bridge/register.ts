import { innerLog } from "../../log";
import { getLocalImageSrc } from "../../utils";
import { Observable } from "rxjs";
import { getObservableConfig } from "../config";
import { Ok, Result } from "ts-results";

function getMethodRegister(): Record<string, (...args: any) => any> {
  return {
    innerLog,
    getLocalImageSrc,
  };
}

async function getObservableRegistry(): Promise<
  Result<Record<string, Observable<any>>, string>
> {
  const register: Record<string, Observable<any>> = {};

  const configRes = await getObservableConfig();
  if (configRes.err) return configRes;
  register.config = configRes.unwrap();

  return new Ok(register);
}

export { getMethodRegister, getObservableRegistry };
