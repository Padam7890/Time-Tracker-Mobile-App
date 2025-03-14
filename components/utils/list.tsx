import { View, Text, Button } from "react-native";
import React from "react";
import Card from "./card";
import CirclewithIcon from "../iconComponents/circle";
// import { Icon } from "react-native-vector-icons/Icon";
import { IListItem } from "@/types/home";

// id:1,
// title:"UI Design",
// tags: ["Work", "Rasion Project"],
// priority: 1,
// timeTaken:"00:42:21"
const List = ({ id, title, tags, priority, timeTaken }: IListItem) => {
  return (
    <Card className=" flex-row gap-4 w-full h-24 items-center justify-between p-4 ">
      {/* Icon */}
      <View className="flex flex-row items-center gap-4">
        <CirclewithIcon bg_color="#FFA656" iconname="computer" />
         <View className="flex flex-col gap-2 items-start">
         <Text
          style={{
            fontFamily: "RubikMedium",

          }}
          className="  text-[1.2rem]"
        >
          UI Design
        </Text>
        <View >
          <View className=" bg-[#FD5B71] px-2 py-[0.4rem] rounded-md ">
            <Text>Work</Text>
          </View>
        </View>
         </View>
      </View>

      <View>
        <Text>00:42:21</Text>
        {/* <Icon onPress={()=> alert("Hello world")} name="play" size={24} color="white" /> */}
      </View>
    </Card>
  );
};

export default List;
