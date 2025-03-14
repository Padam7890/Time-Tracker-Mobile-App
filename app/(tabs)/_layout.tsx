import { View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons";

function TabIcon({ focused, icon,size }: any) {
  return (
    <View style={{ 
      justifyContent: "center", 
      alignItems: "center", 
      position: "absolute", 
      top: "25%", 
    }}>
      <Image
        source={icon}
        tintColor="#151312"
        style={{
          width: focused ? 35 : size,
          height: focused ? 35 : size,
          resizeMode: "contain",
          opacity: focused ? 1 : 0.5,
        }}
      />
    </View>
  );
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1, 
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 60,
          alignItems: "center", 
          justifyContent: "center",
          position: "absolute",
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} size="30" icon={icons.pie_chart} />
          ),
        }}
      />
        <Tabs.Screen
        name="taskadd"
        options={{
          title: "taskadd",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} size="35" icon={icons.icon_add} />
          ),
        }}
      />
        <Tabs.Screen
        name="report"
        options={{
          title: "report",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} size="30" icon={icons.pie_chart_filled} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
