class Size {
  num: number;
  unit: string;

  constructor(num: number, unit: string) {
    this.num = num;
    this.unit = unit;
  }

  toString() {
    return `${this.num} ${this.unit}`;
  }
}

function formatSize(bytes: number, decimalPoints = 2) {
  const units = ["B", "KB", "MB", "GB", "TB"],
    k = 1024;
  if (bytes === 0) return new Size(0, units[0]);
  const size = Math.floor(Math.log(bytes) / Math.log(k));
  return new Size(
    parseFloat(String((bytes / Math.pow(k, size)).toFixed(decimalPoints))),
    units[size]
  );
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
