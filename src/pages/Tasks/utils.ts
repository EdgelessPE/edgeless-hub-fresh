import {PluginDataLocal} from "@/class";

function isDisabled(local: PluginDataLocal): boolean {
  return local.attr?.includes("f") ?? false
}

function isLocalBoost(local: PluginDataLocal): boolean {
  return local.attr?.includes("l") ?? false
}

export {
  isDisabled,
  isLocalBoost
}
