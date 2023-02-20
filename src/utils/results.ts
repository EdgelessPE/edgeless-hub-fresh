//eslint-disable-next-line @typescript-eslint/no-explicit-any
function canBeUnwrapped(val: any): boolean {
  if (typeof val != "object" || val == null) return false;
  if ("some" in val && typeof val?.some == "boolean") {
    return true;
  }
  if ("ok" in val && "err" in val) {
    return typeof val?.ok == "boolean" && typeof val?.err == "boolean";
  }
  return false;
}

export { canBeUnwrapped };
