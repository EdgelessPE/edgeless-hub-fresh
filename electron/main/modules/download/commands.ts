import {TaskState} from "./type";

type TaskStateType = TaskState['type']

const allowedCommandsMap: Record<TaskStateType, Set<string>> = {
  queuing: new Set(["pause", "cancel"]),
  downloading: new Set(["cancel"]),
  validating: new Set(["cancel"]),
  completed: new Set(),
  paused: new Set(["continue", "cancel"]),
  error: new Set(["cancel"]),
}

function getAllowedCommands(type: TaskStateType, allowPause: boolean): string[] {
  const set = allowedCommandsMap[type]
  const cmd = Array.from(set)
  if (allowPause && type == "downloading") {
    cmd.push("pause")
  }
  return cmd
}

function isAllowedCommand(type: TaskStateType, allowPause: boolean, command: string) {
  if (allowPause && type == "downloading" && command == "pause") {
    return true
  }
  const set = allowedCommandsMap[type]
  return set.has(command)
}

export {
  getAllowedCommands,
  isAllowedCommand
}
