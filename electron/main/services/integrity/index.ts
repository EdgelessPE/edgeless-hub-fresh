import { getIntegrityCalculator } from "./_register";
import { Integrity } from "../../../../types";
import { Err, Ok, Result } from "ts-results";

// 返回 OkImpl(boolean) 时表示哈希计算成功，boolean 类型返回值表示哈希比较结果
// 返回 ErrImpl(string) 时表示哈希计算失败
async function validateIntegrity(
  filePath: string,
  integrity: Integrity
): Promise<Result<null, string>> {
  // 获取哈希计算器
  const getCalcRes = getIntegrityCalculator(integrity.method);
  if (getCalcRes.err) return getCalcRes;
  const calculator = getCalcRes.unwrap();

  // 计算哈希
  const calcRes = await calculator(filePath);
  if (calcRes.err) return calcRes;
  const hash = calcRes.unwrap();

  // 对比哈希
  const got = hash.toLowerCase(),
    expected = integrity.value.toLowerCase();
  if (expected != got) {
    return new Err(
      `Error:Integrity validation using ${integrity.method} method failed, expected ${expected},got ${got}`
    );
  }

  return new Ok(null);
}

export { validateIntegrity };
