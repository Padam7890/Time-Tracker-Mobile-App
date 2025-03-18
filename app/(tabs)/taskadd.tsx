import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useModal } from "@/context/modelcontext";
import { Formik, FormikValues } from "formik";
import { taskValidationSchema } from "@/utils/schema";
import useTasks from "@/store/liststore";

const TaskAdd = () => {
  const { tasks, addTask } = useTasks();
  const { isModalVisible, closeModal } = useModal();
  const handleSaveTask = (value: FormikValues) => {

    //check if
    addTask({
      id: tasks.length + 1,
      title: value.taskname,
      tags: value.tasktags.split(","),
      priority: 1,
      status: "pending",
      timeTaken: "00:00:00",
    });
    console.log(value);
    // closeModal();
  };

  return (
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
                </View>
                <View className="flex-col items-center justify-center w-full gap-1">
                  <TouchableOpacity className="mt-4">
                    <Button onPress={closeModal} title="Cancel" />
                  </TouchableOpacity>
                  <TouchableOpacity className="mt-1 p-2 rounded-lg bg-black text-white w-full ">
                    <Button
                      title="Save"
                      onPress={() => handleSubmit()}
                      disabled={!values.taskname || !values.tasktags}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default TaskAdd;
