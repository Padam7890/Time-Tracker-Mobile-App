//zustand store to store tasklist

import { IListItem } from "@/types/home";
import { TASK_LISTS } from "@/utils/dummycontent";
import { create } from "zustand";

interface taskState {
  tasks: IListItem[];
  addTask: (task: IListItem) => void;
  deleteTask: (taskId: string | number) => void;
}
const useTasks = create<taskState>((set) => ({
  tasks: TASK_LISTS,
  addTask: (task: IListItem) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (taskId: string | number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export default useTasks;
