import useTasks from "@/store/liststore";
import { TouchableOpacity } from "react-native";
import Reanimated from "react-native-reanimated";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export const leftSwipe = (id: number) => {
  const { deleteTask } = useTasks();

  const removeStorage = (id: number) => {
    deleteTask(id);
  };

  return (
    <Reanimated.View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          borderRadius: 8,
          padding: 2,
          width: 80,
        }}
        onPress={() => removeStorage(id)}
      >
        <View className="flex items-center justify-center w-full h-full">
          <Icon
            name="delete"
            className="text-center"
            size={24}
            color={"white"}
          />
        </View>
      </TouchableOpacity>
    </Reanimated.View>
  );
};
