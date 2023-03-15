import {
  AbstractPoolNode,
  AbstractPoolStatus,
} from "../../../../types/download";

let taskCount = 0;

function getTaskId(): string {
  return String(taskCount++);
}

function getAbstractPoolStatus(nodes: AbstractPoolNode[]): AbstractPoolStatus {
  const speed = nodes.reduce((acc, cur) => {
    const { payload } = cur.state;
    if (typeof payload === "object" && payload) {
      return payload.speed + acc;
    }
    return acc;
  }, 0);
  return {
    speed,
  };
}

// TODO:引入 check-disk-space 检查磁盘剩余空间

export { getTaskId, getAbstractPoolStatus };
