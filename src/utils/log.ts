import bridge from "@/bridge/method";

function log(text: string) {
  const s = text.split(":");
  if (s.length > 1) {
    switch (s[0]) {
      case "Debug":
        console.log(text);
        bridge("innerLog", "Debug", text);
        break;
      case "Info":
        console.log(text);
        bridge("innerLog", "Info", text);
        break;
      case "Warning":
        bridge("innerLog", "Warning", text);
        console.warn(text);
        break;
      case "Error":
        bridge("innerLog", "Error", text);
        console.error(text);
        break;
      default:
        bridge("innerLog", "Info", text);
        console.log(text);
        break;
    }
  } else {
    bridge("innerLog", "Info", text);
    console.log(text);
  }
}

export { log };
