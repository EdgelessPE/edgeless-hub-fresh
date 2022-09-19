function patch(rawJson: any, patchJson: any): any {
  for (const key in patchJson) {
    if (!rawJson.hasOwnProperty(key)) {
      rawJson[key] = patchJson[key]
    } else {
      const rawVal = rawJson[key], patchVal = patchJson[key]
      if (typeof rawVal != typeof patchVal) {
        //类型不一致，直接放弃patch并可能会在后续的validate中抛出错误
        return rawJson
      } else if (typeof rawVal == "object") {
        rawJson[key] = patch(rawVal, patchVal)
      }
    }
  }
  return rawJson
}

export {
  patch
}
