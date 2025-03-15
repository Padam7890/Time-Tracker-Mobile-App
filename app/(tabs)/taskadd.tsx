import { Modal, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useModal } from "@/context/modelcontext";

const TaskAdd = () => {
  const { isModalVisible, closeModal } = useModal();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <View className="relative flex-1 items-center justify-center bg-black/60">
        <View className="w-4/5 bg-white p-5 rounded-lg shadow-lg">
          <Text className="text-lg font-bold text-center">Task Add</Text>

          <TouchableOpacity
            onPress={closeModal}
            className="mt-4 bg-red-500 p-2 rounded-lg"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskAdd;
