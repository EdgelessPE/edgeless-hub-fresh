import bridge from "@/bridge";

function log(text: string) {
  const s = text.split(":");
  if (s.length > 1) {
    switch (s[0]) {
      case "Info":
        console.log(text);
        bridge("log", "Info", text);
        break;
      case "Warning":
        bridge("log", "Warning", text);
        // electronLog.warn(text)
        console.warn(text);
        break;
      case "Error":
        bridge("log", "Error", text);
        // electronLog.error(text)
        console.error(text);
        break;
      default:
        bridge("log", "Info", text);
        // electronLog.info(text)
        console.log(text);
        break;
    }
  } else {
    bridge("log", "Info", text);
    console.log(text);
  }
}

export { log };
