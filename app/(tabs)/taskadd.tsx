import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Keyboard,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useModal } from "@/context/modelcontext";
import { Formik, FormikValues } from "formik";
import { taskValidationSchema } from "@/utils/schema";
import useTasks from "@/store/liststore";

import useTaskTimer from "@/store/timerstore";

const TaskAdd = () => {
  const { tasks, addTask } = useTasks();
  const { isModalVisible, closeModal } = useModal();
  // const setTaskById = useTaskTimer((state) => state.setTaskById);

  const handleSaveTask = (value: FormikValues) => {
    // Check if timeLimit is in the correct format and save the task
    addTask({
      id: 0,
      title: value.taskname,
      tags: value.tasktags.split(","),
      priority: 1,
      status: "pending",
      timeTaken: "00:00:00",
      timeLimit: value.timeLimit,
      timercycle:0,
    });
    console.log(value.timeLimit);
    // closeModal();
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View className=" flex-1 items-center justify-center bg-black/60 overflow-hidden">
          <View className="w-4/5 bg-white p-5 rounded-lg shadow-lg">
            <Text className="text-lg font-bold text-center">Task Add</Text>
            <Formik
              initialValues={{
                taskname: "",
                tasktags: "",
                timeLimit: "00:00:00",
              }}
              validationSchema={taskValidationSchema}
              onSubmit={(value) => handleSaveTask(value)}
            >
              {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View className=" mt-4 mb-4 flex-col gap-4">
                    <View>
                      <Text
                        style={{
                          fontFamily: "RubikPrimary",
                        }}
                        className="text-[12px] text-slate-50 opacity-20 mb-4"
                      >
                        Write the Task name ex: UI Design
                      </Text>
                      <TextInput
                        style={{
                          fontFamily: "RubikPrimary",
                        }}
                        value={values.taskname}
                        onChangeText={handleChange("taskname")}
                        onBlur={handleBlur("taskname")}
                        placeholder="Task Name"
                        className=" border border-[#F1F5F9] p-3 rounded-md placeholder:bg-[#F1F5F9] placeholder:text-[#49494a]"
                      />

                      {errors?.taskname && touched.taskname && (
                        <Text className="text-red-500 mt-1">
                          {errors?.taskname}
                        </Text>
                      )}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: "RubikPrimary",
                        }}
                        className="text-[8px] text-slate-50 opacity-20 mb-4"
                      >
                        Write the Task tag with commas : UI,Web
                      </Text>
                      <TextInput
                        style={{
                          fontFamily: "RubikPrimary",
                        }}
                        value={values.tasktags}
                        onChangeText={handleChange("tasktags")}
                        onBlur={handleBlur("tasktags")}
                        placeholder="Task Tags"
                        className=" border border-[#F1F5F9] p-3 rounded-md placeholder:bg-[#F1F5F9] placeholder:text-[#49494a]"
                      />

                      {errors?.tasktags && touched.tasktags && (
                        <Text className="text-red-500 mt-1">
                          {errors?.tasktags}
                        </Text>
                      )}
                    </View>

                    <View className="flex flex-col gap-4 mt-3">
                      <Text
                        style={{
                          fontFamily: "RubikPrimary",
                        }}
                      >
                        Time Taken:
                      </Text>
                      <View className=" flex-row gap-4">
                        <TextInput
                          style={{
                            fontFamily: "RubikPrimary",
                            width: "30%",
                            textAlign: "right",
                          }}
                          value={values.timeLimit.split(":")[0]}
                          onChangeText={(text) =>
                            handleChange("timeLimit")(
                              text + ":" + values.timeLimit.split(":")[1]
                            )
                          }
                          onBlur={handleBlur("timeLimit")}
                          keyboardType="numeric"
                          placeholder="Hours"
                          className="border border-[#F1F5F9] p-3 rounded-md placeholder:bg-[#F1F5F9] placeholder:text-[#49494a]"
                        />
                        {/* Minutes input */}
                        <TextInput
                          style={{
                            fontFamily: "RubikPrimary",
                            width: "30%",
                            textAlign: "right",
                          }}
                          value={values.timeLimit.split(":")[1]}
                          onChangeText={(text) =>
                            handleChange("timeLimit")(
                              values.timeLimit.split(":")[0] + ":" + text
                            )
                          }
                          onBlur={handleBlur("timeLimit")}
                          keyboardType="numeric"
                          placeholder="Minutes"
                          className="border border-[#F1F5F9] p-3 rounded-md placeholder:bg-[#F1F5F9] placeholder:text-[#49494a]"
                        />
                        {/* Seconds input */}
                        <TextInput
                          style={{
                            fontFamily: "RubikPrimary",
                            width: "30%",
                            textAlign: "right",
                          }}
                          value={values.timeLimit.split(":")[2]}
                          onChangeText={(text) =>
                            handleChange("timeLimit")(
                              values.timeLimit.split(":")[0] +
                                ":" +
                                values.timeLimit.split(":")[1] +
                                ":" +
                                text
                            )
                          }
                          onBlur={handleBlur("timeLimit")}
                          keyboardType="numeric"
                          placeholder="Seconds"
                          className="border border-[#F1F5F9] p-3 rounded-md placeholder:bg-[#F1F5F9] placeholder:text-[#49494a]"
                        />
                      </View>
                      {/* Hours input */}
                    </View>
                  </View>

                  <View className="flex-col items-center justify-center w-full gap-1">
                    <TouchableOpacity className="mt-4">
                      <Button onPress={closeModal} title="Cancel" />
                    </TouchableOpacity>

                    <Button
                      title="Save"
                      color={"white"}
                      onPress={() => handleSubmit()}
                      disabled={!values.taskname || !values.tasktags}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TaskAdd;
