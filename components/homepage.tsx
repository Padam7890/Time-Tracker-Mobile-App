import RadialEllipse from "@/components/iconComponents/radialelipsecom";
import List from "@/components/utils/list";
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useTasks from "@/store/liststore";
import { leftSwipe } from "@/components/utils/swipetask";
import useTaskTimer from "@/store/timerstore";

const HomePage = () => {
  const { tasks } = useTasks();
  const { getTaskWhichisRunning } = useTaskTimer();

  const runningTask = getTaskWhichisRunning();
  console.log(tasks)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 mt-32 px-5 flex-col gap-6">
        <View className="flex-col gap-6">
          <Text style={{ fontFamily: "RubikMedium" }} className="text-2xl">
            Task
          </Text>
          {!runningTask ? (
            <Text
              style={{ fontFamily: "RubikMedium" }}
              className="text-black text-2xl text-center"
            >
              No Running Task
            </Text>
          ) : (
            <Swipeable
              enableTrackpadTwoFingerGesture
              renderRightActions={() => leftSwipe(runningTask?.id as number)}
              dragOffsetFromLeftEdge={Number.MAX_VALUE}
              friction={2}
            >
              <View className="bg-secondary h-[7.125rem] rounded-lg w-full px-4 flex-col justify-between gap-3 pb-6">
                <View className="flex flex-row justify-between items-center w-full mt-6">
                  <Text
                    style={{ fontFamily: "RubikMedium" }}
                    className="text-white text-3xl"
                  >
                    {runningTask?.timeLimit}
                  </Text>
                  <TouchableOpacity>
                    <Icon
                      className="text-center"
                      name="right"
                      size={24}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-row gap-3 items-center">
                  <RadialEllipse />
                  <Text
                    style={{ fontFamily: "RubikPrimary" }}
                    className="text-white"
                  >
                    {runningTask?.title}
                  </Text>
                </View>
              </View>
            </Swipeable>
          )}
        </View>

        <View className="flex-1 flex-col items-center w-full">
          <View className="flex-row items-center justify-between w-full">
            <Text
              style={{ fontFamily: "RubikMedium" }}
              className="text-black text-2xl"
            >
              All Tasks
            </Text>
            <Button color={"black"} title="See All" />
          </View>

          <View className="flex-1 w-full mb-3">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ minHeight: "100%", paddingBottom: 80 }}
              className="flex-1 w-full"
            >
              <FlatList
                data={tasks}
                renderItem={({ item }) => (
                  <Swipeable
                    enableTrackpadTwoFingerGesture
                    renderRightActions={() => leftSwipe(item.id as number)}
                    dragOffsetFromLeftEdge={Number.MAX_VALUE}
                    friction={2}
                  >
                    <List {...item} />
                  </Swipeable>
                )}
                className="w-full pb-5"
                ItemSeparatorComponent={() => <View className="h-4" />}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomePage;
