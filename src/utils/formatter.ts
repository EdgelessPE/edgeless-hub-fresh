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

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const ymd = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
  const cur = new Date();
  const sinceDays = Math.round(
    (cur.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );

  if (sinceDays <= 30) {
    return `${sinceDays}天前`;
  } else {
    return `${ymd.year}-${ymd.month}-${ymd.day}`;
  }
}

export { formatTimestamp, formatSize };
