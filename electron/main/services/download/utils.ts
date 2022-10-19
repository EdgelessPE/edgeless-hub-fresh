let taskCount = 0;

export function getTaskId(provider: string): string {
  return provider + "_" + taskCount++;
}
