interface TaskProgressNotification {
  percent: number; // 进度百分比，取值0-100
  speed: number; // 下载速度，单位 B/s
}

export {
  TaskProgressNotification
}
