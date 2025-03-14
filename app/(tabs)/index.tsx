import RadialEllipse from "@/components/iconComponents/radialelipsecom";
import List from "@/components/utils/list";
import { TASK_LISTS } from "@/utils/dummycontent";
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Index() {
  return (
    <View className="flex-1 mt-32 px-5 flex-col gap-6">
      <View className=" flex-col gap-6">
        <Text
          style={{
            fontFamily: "RubikMedium",
          }}
          className=" text-2xl"
        >
          Task
        </Text>
        <View className=" bg-secondary h-[7.125rem] rounded-xl w-full px-4 flex-col justify-between gap-3 pb-6">
          <View className=" flex flex-row justify-between items-center w-full  mt-6">
            <Text
              style={{
                fontFamily: "RubikMedium",
              }}
              className=" text-white text-3xl "
            >
              00:32:10
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
          <View className=" flex-row gap-3 items-center">
            <RadialEllipse />
            <Text
              style={{
                fontFamily: "RubikPrimary",
              }}
              className="text-white"
            >
              Hero Section
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-1 flex-col items-center w-full">
        <View className="flex-row items-center justify-between w-full">
          <Text
            style={{
              fontFamily: "RubikMedium",
            }}
            className=" text-black text-2xl"
          >
            Today
          </Text>
          <Button title="See All" />
        </View>
       <View className="flex-1 w-full mb-3">
         {/* render list of items here */}
            <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              minHeight: "100%",
              paddingBottom: 80,
            }}
            className="flex-1 w-full"

            >
            <FlatList 
            numColumns={1}
            data={TASK_LISTS} 
            renderItem= {({item}) =>(
                <List {...item} />
            )}
            className="w-full pb-5 "
            ItemSeparatorComponent={() => <View className="h-4" />} // Adds space between items
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}

            />
            </ScrollView>
       </View>
      </View>
    </View>
  );
}
