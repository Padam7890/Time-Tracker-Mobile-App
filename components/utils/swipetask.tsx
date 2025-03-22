import useTasks from "@/store/liststore";
import { TouchableOpacity } from "react-native";
import Reanimated from "react-native-reanimated";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";

export const leftSwipe = (id: number) => {
  const { deleteTask } = useTasks();
  const navigation = useRouter();

  const removeStorage = (id: number) => {
    deleteTask(id);
  };

  return (
    <Reanimated.View>
      <View className=" flex-row items-center justify-center h-full">
      <TouchableOpacity
      className=" bg-green-500 px-6 py-6 h-full flex items-center justify-center  "
        style={{ marginLeft: 0 }}
        onPress={() =>
          navigation.push({
            pathname: "/taskdetails",
            params: { itemId: id },
          })
        }
      >
        <Icon name="edit" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
           className=" bg-red-500 px-6 py-6 h-full flex items-center justify-center "
           style={{ marginLeft: 0 }}
        onPress={() => removeStorage(id)}
      >
        <Icon name="delete" size={20} color="white" />
      </TouchableOpacity>
      </View>
      
    </Reanimated.View>
  );
};
