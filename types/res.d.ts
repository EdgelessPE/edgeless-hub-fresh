import { Result } from "ts-results";

type Res<T> = Result<T, string>;
type ARes<T> = Promise<Result<T, string>>;

export { Res, ARes };
