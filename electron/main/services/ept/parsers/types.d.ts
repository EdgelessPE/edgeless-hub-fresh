import { Result } from "ts-results";
import { HelloResponse } from "../../../../../types/online";

interface RegisterNode {
  supportedProtocols: string[];
  entrance: ParserEntrance;
}

// 理论上应该再抽象一层类型表述，但是考虑到这个 hub 可能是 Edgeless 转型前的最后一个版本了就偷个懒
// 包括 types/online.d.ts 文件也应该加一层抽象，这里先直接使用 3.1.0 Protocol 的类型表述
type EptParserReturned = HelloResponse;
type ParserEntrance = (
  baseUrl: string
) => Promise<Result<EptParserReturned, string>>;

export { RegisterNode, ParserEntrance };
