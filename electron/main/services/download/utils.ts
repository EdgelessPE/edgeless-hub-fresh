let taskCount = 0;

function getTaskId(provider: string): string {
  return provider + "_" + taskCount++;
}

// TODO:引入 check-disk-space 检查磁盘剩余空间

export {
  getTaskId,
}
