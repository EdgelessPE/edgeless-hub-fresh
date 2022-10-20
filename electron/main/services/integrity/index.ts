import {getIntegrityCalculator} from "./_register"
import {Integrity} from "../../../../types";
import {Ok, Result} from "ts-results";

// 返回 OkImpl(boolean) 时表示哈希计算成功，boolean 类型返回值表示哈希比较结果
// 返回 ErrImpl(string) 时表示哈希计算失败
async function validateIntegrity(filePath: string, integrity: Integrity): Promise<Result<boolean, string>> {
  // 获取哈希计算器
  const getCalcRes = getIntegrityCalculator(integrity.method)
  if (getCalcRes.err) return getCalcRes
  const calculator = getCalcRes.unwrap()

  // 计算哈希
  const calcRes = await calculator(filePath)
  if (calcRes.err) return calcRes
  const hash = calcRes.unwrap()

  return new Ok(hash.toLowerCase() == integrity.value.toLowerCase())
}

export {
  validateIntegrity
}
