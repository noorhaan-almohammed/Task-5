import { useCallback } from "react";
import { TaskRepository } from "../repositories/TaskRepository";

const TaskRepo = new TaskRepository();

export function useTask() {
  const getTasks = useCallback(TaskRepo.getTasks.bind(TaskRepo), []);
  const editTask = useCallback(TaskRepo.editTask.bind(TaskRepo), []);

  return {
    getTasks,
    editTask,
  };
}
