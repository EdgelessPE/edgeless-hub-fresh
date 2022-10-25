let taskCount = 0;

function getTaskId(provider: string): string {
  return provider + "_" + taskCount++;
}

export {
  getTaskId,
}
