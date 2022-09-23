import bridge from "@/bridge";

function log(text: string) {
  const s = text.split(":");
  if (s.length > 1) {
    switch (s[0]) {
      case "Info":
        console.log(text);
        bridge("innerLog", "Info", text);
        break;
      case "Warning":
        bridge("innerLog", "Warning", text);
        // electronLog.warn(text)
        console.warn(text);
        break;
      case "Error":
        bridge("innerLog", "Error", text);
        // electronLog.error(text)
        console.error(text);
        break;
      default:
        bridge("innerLog", "Info", text);
        // electronLog.info(text)
        console.log(text);
        break;
    }
  } else {
    bridge("innerLog", "Info", text);
    console.log(text);
  }
}

export { log };
