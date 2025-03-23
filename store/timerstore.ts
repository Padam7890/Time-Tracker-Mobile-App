import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import useTasks from "./liststore";
import { addTimes } from "@/utils/funcs";
import { IListItem } from "@/types/home";

// Define state shape
interface TaskTimerState {
  taskTimers: Record<
    string,
    { time: string; isRunning: boolean; timer: NodeJS.Timeout | null }
  >;
  taskId: string | null;
  getTaskWhichisRunning: () => IListItem | null;
  extendTime: (extendTime: string) => void;
  setTaskById: (id: string) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  removeTaskWithTimer: (id: number) => void;
  updateTaskWithTimer: (task: any) => void;
}

const useTaskTimer = create<TaskTimerState>()(
  persist(
    (set, get) => ({
      taskTimers: {},
      taskId: null,
      isRunning: false,

      setTaskById: (id: string) => {
        set((state) => ({
          taskId: id,
          taskTimers: {
            ...state.taskTimers,
            [id]: state.taskTimers[id] || {
              time: "00:00:00",
              isRunning: false,
              timer: null,
            },
          },
        }));
      },

      startTimer: () => {
        const { taskId, taskTimers } = get();
        if (!taskId) return;
        const task = useTasks.getState().getTaskById(taskId);
        //stop previous any timer running then stop that timer
        //useless code below:
        if (taskTimers[taskId]?.timer) {
          clearInterval(taskTimers[taskId].timer!);
        }
        // Stop any running timer for any task
        Object.values(taskTimers).forEach(({ timer }) => {
          if (timer) {
            clearInterval(timer);
            // also i want to isrunning false for previous run
          }
        });

        // Set `isRunning` to false for all tasks before starting a new one
        set((state) => ({
          taskTimers: Object.fromEntries(
            Object.entries(state.taskTimers).map(([id, timerData]) => [
              id,
              { ...timerData, isRunning: false, timer: null },
            ])
          ),
        }));

        // Check if we already have an initial time saved
        let [hours, minutes, seconds] = taskTimers[taskId]?.time
          ?.split(":")
          .map(Number) || [0, 0, 0];

        // Calculate the total initial time in seconds
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        // If no saved time (i.e., first time starting), set totalSeconds to 0
        if (totalSeconds === 0) {
          totalSeconds = 0;
        }

        let timeCycle = task?.timercycle || 0;

        // Calculate the time limit in seconds
        const [limitHours, limitMinutes, limitSeconds] = (
          task?.timeLimit ?? "00:00:00"
        )
          .split(":")
          .map((num) => Number(num) || 0);

        const limitTotalSeconds =
          limitHours * 3600 + limitMinutes * 60 + limitSeconds;

        const newTimer = setInterval(() => {
          totalSeconds++; // Increment total seconds

          // Calculate hours, minutes, seconds from total seconds
          hours = Math.floor(totalSeconds / 3600);
          minutes = Math.floor((totalSeconds % 3600) / 60);
          seconds = totalSeconds % 60;

          const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

          // Ensure UI updates before stopping
          if (totalSeconds >= limitTotalSeconds) {
            console.log("Stop Timer");
            timeCycle++;

            // Save time cycle
            useTasks.getState().updateTask({
              ...task!,
              timercycle: timeCycle,
            });

            set((state) => ({
              taskTimers: {
                ...state.taskTimers,
                [taskId]: {
                  ...state.taskTimers[taskId],
                  isRunning: false,
                  timer: null,
                  time: formattedTime,
                },
              },
            }));
            clearInterval(newTimer);
            return;
          }

          // Update the time in the state
          set((state) => ({
            taskTimers: {
              ...state.taskTimers,
              [taskId]: { ...state.taskTimers[taskId], time: formattedTime },
            },
          }));
        }, 1000);

        // Store the timer reference in the state
        set((state) => ({
          taskTimers: {
            ...state.taskTimers,
            [taskId]: {
              time: taskTimers[taskId]?.time ?? "00:00:00",
              isRunning: true,
              timer: newTimer,
            },
          },
        }));
      },
      removeTaskWithTimer: (id: number) => {
        const { taskTimers } = get();
        if (!id) return;
        // Stop the timer
        if (taskTimers[id]?.timer) {
          clearInterval(taskTimers[id].timer!);
        }
        // Remove the timer from the state
        set((state) => ({
          taskTimers: {
            ...Object.fromEntries(
              Object.entries(state.taskTimers).filter(([id]) => id !== id)
            ),
          },
        }));
        //remove the task from
        useTasks.getState().deleteTask(id);
      },

      extendTime: (extendedTime: string) => {
        const { taskId, taskTimers } = get();
        if (!taskId) return;

        const taskStore = useTasks.getState();
        let task = taskStore.getTaskById(taskId);
        if (!task) {
          console.log("Task not found");
          return;
        }

        // Add extended time to the existing time limit
        task!.timeLimit = addTimes(task!.timeLimit, extendedTime);

        // Save the task with the updated time limit
        task = { ...task!, extendTime: extendedTime };
        useTasks.getState().updateTask(task);
        console.log("task after extending time", task);

        // Resume the timer with the extended time (exactly from where it left off)
        useTaskTimer.getState().startTimer();
      },

      stopTimer: () => {
        const { taskId, taskTimers } = get();
        if (!taskId || !taskTimers[taskId]) return;

        clearInterval(taskTimers[taskId].timer!);

        set((state) => ({
          taskTimers: {
            ...state.taskTimers,
            [taskId]: {
              ...state.taskTimers[taskId],
              isRunning: false,
              timer: null,
            },
          },
        }));
      },

      resetTimer: () => {
        const { taskId, taskTimers } = get();
        if (!taskId || !taskTimers[taskId]) return;

        clearInterval(taskTimers[taskId].timer!);

        set((state) => ({
          taskTimers: {
            ...state.taskTimers,
            [taskId]: { time: "00:00:00", isRunning: false, timer: null },
          },
        }));
      },
      updateTaskWithTimer: () => {
        const { taskId, taskTimers } = get();
        if (!taskId) return;

        const timeTaken = taskTimers[taskId]?.time || "00:00:00";
        const task = useTasks.getState().getTaskById(taskId);
        if (task) {
          task.timeTaken = timeTaken;
          useTasks.getState().updateTask(task);
        }
        console.log(`Task ${taskId} time recorded: ${timeTaken}`);
      },

      //get task which is currently running
      getTaskWhichisRunning: () => {
        const { taskTimers } = useTaskTimer.getState();
        const taskId = Object.keys(taskTimers).find(
          (id) => taskTimers[id].isRunning
        );
        if (taskId) {
          const task = useTasks.getState().getTaskById(taskId);
          if (task) { 
            return task;
            // console.log(`Task ${task.title} is currently running.`);
          }
        }
        return null;
      },
    }),

    {
      name: "task-timer-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTaskTimer;
