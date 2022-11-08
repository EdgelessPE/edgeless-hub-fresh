import bridge from "@/bridge/method";

function log(text: string) {
  const s = text.split(":");
  if (s.length > 1) {
    switch (s[0]) {
      case "Debug":
        console.log(text);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        bridge("innerLog", "Debug", text).then(() => {});
        break;
      case "Info":
        console.log(text);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        bridge("innerLog", "Info", text).then(() => {});
        break;
      case "Warning":
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        bridge("innerLog", "Warning", text).then(() => {});
        console.warn(text);
        break;
      case "Error":
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        bridge("innerLog", "Error", text).then(() => {});
        console.error(text);
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        bridge("innerLog", "Info", text).then(() => {});
        console.log(text);
        break;
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    bridge("innerLog", "Info", text).then(() => {});
    console.log(text);
  }
}

export { log };
