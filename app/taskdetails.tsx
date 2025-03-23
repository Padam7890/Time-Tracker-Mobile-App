import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useTasks from "@/store/liststore";
import useTaskTimer from "@/store/timerstore";
import TimerCircle from "@/components/utils/timercircle";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Octicons";

const TaskDetails = () => {
  // Navigation
  const navigation = useNavigation();
  const { itemId } = useLocalSearchParams();
  const { getTaskById, getTotalMinutes } = useTasks();
  const {
    taskId,
    taskTimers,
    startTimer,
    stopTimer,
    resetTimer,
    setTaskById,
    extendTime,
    updateTaskWithTimer,
  } = useTaskTimer();

  const task = getTaskById(itemId as string);

  // Get task-specific timer state
  const taskTimer = taskTimers[taskId!] || {
    time: "00:00:00",
    isRunning: false,
  };
  const { time, isRunning } = taskTimer;

  useEffect(() => {
    if (itemId) setTaskById(itemId as string);
  }, [itemId]);

  // Convert time string to numbers
  const [hours, minutes, seconds] = useMemo(
    () => time.split(":").map(Number),
    [time]
  );

  const GoBack = () => {
    navigation.goBack();
  };
  console.log(task?.id)
  const taskDisable = task?.timeLimit == time

  return (
    <View className="flex-1 mt-32 px-5 gap-6">
      <View>
        {/* Task Title and Tags */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={GoBack}>
            <Icon name="arrow-left" size={32} color="#000000" />
          </TouchableOpacity>
          <Text className="text-2xl font-medium">{task?.title}</Text>
          <View className="flex-row gap-3 flex-wrap">
            {task?.tags?.map((tag, index) => (
              <TouchableOpacity key={index} className="bg-red-300 px-2 py-3">
                <Text>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timer Circle */}
        <View className="mt-32 items-center justify-center">
          <TimerCircle
            key={itemId as string}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            totalMinutes={Number(getTotalMinutes(task?.id!))}
          />
        </View>

        {/* Controls: Start/Pause & Reset */}
        <SafeAreaView className="mt-2">
          <View>
            <TouchableOpacity
              disabled= {taskDisable }
              className={`flex-row justify-center items-center gap-2 px-3 py-8 rounded-md 
                ${taskDisable ? "bg-gray-300" : "bg-[#E9E9FF]"}`}
              onPress={() => {
                if (isRunning) {
                  console.log("Timer Stopped");
                  stopTimer();
                  updateTaskWithTimer(task!);
                } else {
                  console.log("Timer Started");
                  startTimer();
                }
              }}
            >
              <Text className={`text-lg ${taskDisable ? "text-gray-500": "text-black"} `} style={{ fontFamily: "RubikBold" }}>
                {isRunning ? "Finish" : "Start"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-center mt-8 gap-6">
            <TouchableOpacity
              className=" flex-row justify-center items-center gap-2 "
              onPress={() => {
                if (Number(task?.timercycle) > 0) {
                  console.log("Time Extended 10 Minutes");
                  extendTime("00:01:00");
                } else {
                  console.log("Timer Started");
                  startTimer();
                }
              }}
            >
              <Text className="text-lg" style={{ fontFamily: "RubikRegular" }}>
                {Number(task?.timercycle) > 0 ? "Extend Time 1 Min" : ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center items-center rounded-md"
              onPress={() => {
                resetTimer();
                updateTaskWithTimer(task!);
              }}
            >
              <Text style={{ fontFamily: "RubikRegular" }} className="text-lg">
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default TaskDetails;
