import { IListItem } from "@/types/home";
import { TASK_LISTS } from "@/utils/dummycontent";
import { create } from "zustand";

interface taskState {
  tasks: IListItem[];
  addTask: (task: IListItem) => void;
  pendingTask: (taskId: string | number) => void;
  completeTask: (taskId: string | number) => void;
  deleteTask: (taskId: string | number) => void;
}

const useTasks = create<taskState>((set) => ({
  tasks: TASK_LISTS,

  addTask: (task: IListItem) =>
    set((state) => {
      let updatedTasks = state.tasks.map((t) =>
        t.status === "pending" ? { ...t, status: "completed" } : t
      );

      return { tasks: [...updatedTasks, { ...task, status: "pending" }] };
    }),

  pendingTask: (taskId: string | number) =>
    set((state) => {
      let updatedTasks = state.tasks.map((task) =>
        task.status === "pending" ? { ...task, status: "completed" } : task
      );

      updatedTasks = updatedTasks.map((task) =>
        task.id === taskId ? { ...task, status: "pending" } : task
      );

      return { tasks: updatedTasks };
    }),


  completeTask: (taskId: string | number) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      ),
    })),



  deleteTask: (taskId: string | number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export default useTasks;
