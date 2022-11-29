function formatSize(bytes: number, decimalPoints = 2) {
  const units = ["B", "KB", "MB", "GB", "TB"],
    k = 1024;
  if (bytes === 0)
    return {
      num: 0,
      unit: units[0],
      toString() {
        return `${this.num} ${this.unit}`;
      },
    };
  const size = Math.floor(Math.log(bytes) / Math.log(k));
  return {
    num: parseFloat(String((bytes / Math.pow(k, size)).toFixed(decimalPoints))),
    unit: units[size],
    toString() {
      return `${this.num} ${this.unit}`;
    },
  };
}

export { formatSize };
