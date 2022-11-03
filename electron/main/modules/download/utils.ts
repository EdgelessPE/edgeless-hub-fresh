let taskCount = 0;

function getTaskId(): string {
  return String(taskCount++);
}

// TODO:引入 check-disk-space 检查磁盘剩余空间

export {
  getTaskId,
}
