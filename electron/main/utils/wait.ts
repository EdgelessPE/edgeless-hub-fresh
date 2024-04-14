export async function nextTickNodejs(): Promise<void> {
  return new Promise((resolve) => {
    process.nextTick(resolve);
  });
}
export async function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
