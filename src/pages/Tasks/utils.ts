import {FileNodePackageLocal} from "@/classes/local";


function isDisabled(local: FileNodePackageLocal): boolean {
  return local.flags?.has("f") ?? false
}

function isLocalBoost(local: FileNodePackageLocal): boolean {
  return local.flags?.has("l") ?? false
}

function calcStatusWeight(data: FileNodePackageLocal): number {
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
