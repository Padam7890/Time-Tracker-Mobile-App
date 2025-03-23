import { IListItem, status } from "@/types/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useTaskTimer from "./timerstore";

interface TaskState {
  tasks: IListItem[];
  getTaskById: (taskId: string | number) => IListItem | undefined;
  getTotalMinutes: (taskid: string | number) => string | number;
  addTask: (task: IListItem) => void;
  pendingTask: (taskId: string | number) => void;
  completeTask: (taskId: string | number) => void;
  updateTask: (task: IListItem) => void;
  deleteTask: (taskId: string | number) => void;
}

const useTasks = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task: IListItem) =>
        set((state) => {
          // Find the highest current ID and increment it
          const maxId =
            state.tasks.length > 0
              ? Math.max(...state.tasks.map((t) => Number(t.id)))
              : 0;
          const newId = maxId + 1;

          let updatedTasks = state.tasks.map((t) =>
            t.status === status.pending ? { ...t, status: status.completed } : t
          );
          return {
            tasks: [
              ...updatedTasks,
              { ...task, id: newId, status: status.pending },
            ],
          };
        }),

      pendingTask: (taskId: string | number) =>
        set((state) => {
          let updatedTasks = state.tasks.map((task) =>
            task.status === status.pending
              ? { ...task, status: status.completed }
              : task
          );

          updatedTasks = updatedTasks.map((task) =>
            task.id === taskId ? { ...task, status: status.pending } : task
          );

          return { tasks: updatedTasks };
        }),

      completeTask: (taskId: string | number) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: status.completed } : task
          ),
        })),

      getTaskById: (taskId: string | number) => {
        return get().tasks.find((task) => task.id == taskId);
      },

      //updateTask
      updateTask: (task: IListItem) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === task.id ? { ...t, ...task } : t
          ),
        })),
      getTotalMinutes: (taskId: string | number) => {
        const task = get().tasks.find((task) => task.id === taskId);

        if (task && task.timeLimit) {
          // Split the timeLimit string into hours, minutes, and seconds
          const [hours, minutes, seconds] = task.timeLimit
            .split(":")
            .map(Number);

          // Validate the split parts to ensure they're numbers
          if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            console.error(
              `Invalid timeLimit format for task: ${task.id}, timeLimit: ${task.timeLimit}`
            );
            return 0;
          }

          // Calculate total minutes for the task
          const totalMinutes = hours * 60 + minutes + seconds / 60;
          return totalMinutes;
        }

        // If the task doesn't exist or has no timeLimit, return 0
        return 0;
      },

      deleteTask: async (id) => {
        console.log(id);
        set((state) => {
          const updatedTasks = state.tasks.filter((task) => task.id !== id);
          return { tasks: updatedTasks };
        });
        AsyncStorage.setItem("task-storage", JSON.stringify(get().tasks));
      },
      loadTasks: async () => {
        const storedTasks = await AsyncStorage.getItem("task-storage");
        if (storedTasks) {
          set({ tasks: JSON.parse(storedTasks) });
        }
      },
    }),

    {
      name: "tasks-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTasks;
