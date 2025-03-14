import RadialEllipse from "@/components/iconComponents/radialelipsecom";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Index() {
  return (
    <View className=" mt-32 px-5 flex-col gap-6">
      <View className=" flex flex-col gap-6">
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
        <View className="flex-row items-center w-full">
          <View className="flex-row items-center justify-between w-full">
          <Text style={{
            fontFamily: "RubikMedium",
          }} className=" text-black text-2xl">Today</Text>
          <Button title="See All" />
          </View>
        </View>
      </View>
  );
}
