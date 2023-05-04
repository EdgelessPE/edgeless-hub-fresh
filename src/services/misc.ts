import bridge from "@/bridge/method";

async function getVersion(): Promise<string> {
  return bridge("getVersion");
}

export { getVersion };
