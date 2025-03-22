import { View, Text, Platform, Pressable } from "react-native";
import React from "react";
import Card from "./card";
import CirclewithIcon from "../iconComponents/circle";
import { IListItem } from "@/types/home";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";



const List = ({ id, title, tags, priority, timeLimit }:IListItem) => {
  const navigation = useRouter();
  const isAndroid = Platform.OS === "android";

  const content = (
    <Card className="flex-row gap-4 w-full h-24 items-center justify-between p-4">
      {/* Icon */}
      <View className="flex flex-row items-center gap-4">
        <CirclewithIcon bg_color="#FFA656" iconname="computer" />
        <View className="flex flex-col gap-2 items-start">
          <Text
            style={{
              fontFamily: "RubikMedium",
            }}
            className="text-[1.2rem]"
          >
            {title}
          </Text>
          <View>
            <View className="flex-row gap-3 flex-nowrap">
              {tags.map((tag, index) => (
                <Text
                  className="bg-[#FD5B71] px-2 py-[0.4rem] rounded-md"
                  key={index}
                >
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontFamily: "RubikPrimary",
            color: "#4F4F4F",
            fontSize: 12,
          }}
        >
          {timeLimit}
        </Text>
        <Icon
          className="text-right"
          onPress={() => alert("Hello world")}
          name="play"
          size={30}
          color="#828282"
        />
      </View>
    </Card>
  );

  return isAndroid ? (
    <Pressable
      onStartShouldSetResponder={() => false}
      onPress={() =>
        navigation.push({
          pathname: "/taskdetails",
          params: { itemId: id },
        })
      }
    >
      {content}
    </Pressable>
  ) : (
    content
  );
};

export default List;
