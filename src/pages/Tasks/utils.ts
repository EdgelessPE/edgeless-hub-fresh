import {PluginDataLocal} from "@/class";

function isDisabled(local: PluginDataLocal): boolean {
  return local.attr?.includes("f") ?? false
}

function isLocalBoost(local: PluginDataLocal): boolean {
  return local.attr?.includes("l") ?? false
}

function calcStatusWeight(data: PluginDataLocal): number {
  let weight = 0
  if (isDisabled(data)) weight += 10
  if (isLocalBoost(data)) weight += 1
  return weight
}

export {
  isDisabled,
  isLocalBoost,
  calcStatusWeight
}
