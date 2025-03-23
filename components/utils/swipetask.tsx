import useTasks from "@/store/liststore";
import { TouchableOpacity } from "react-native";
import Reanimated from "react-native-reanimated";
import { View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";
import useTaskTimer from "@/store/timerstore";

export const leftSwipe = (id: number) => {
  const navigation = useRouter();

  const removeStorage = (id: number) => {
    useTaskTimer.getState().removeTaskWithTimer(id)
  };

  return (
    <Reanimated.View>
      <View className=" flex-row items-center justify-center h-full rounded-lg overflow-hidden">
      <TouchableOpacity
      className=" bg-green-500 px-6 py-6 h-full flex items-center justify-center "
        style={{ marginLeft: 0 }}
        onPress={() =>
          navigation.push({
            pathname: "/taskdetails",
            params: { itemId: id },
          })
        }
      >
        <Icon name="eye" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
           className=" bg-red-500 px-6 py-6 h-full flex items-center justify-center"
           style={{ marginLeft: 0 }}
        onPress={() => removeStorage(id)}
      >
        <Icon name="delete" size={20} color="white" />
      </TouchableOpacity>
      </View>
      
    </Reanimated.View>
  );
};
