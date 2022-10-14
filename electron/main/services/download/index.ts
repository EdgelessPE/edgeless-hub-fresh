import { AddTaskSuggested } from "./provider/type";
import { Result } from "ts-results";

// 返回唯一的 task id
async function addTask(
  url: string,
  suggested: AddTaskSuggested
): Promise<Result<string, string>> {}
