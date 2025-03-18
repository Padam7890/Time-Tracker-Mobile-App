import { View, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { ModalProvider, useModal } from "@/context/modelcontext"; // Import modal context
import TaskAdd from "./taskadd";
import { Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Tab Icon Component
function TabIcon({ focused, icon, size }: any) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "25%",
      }}
    >
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

export const _layout = () => {
  const { openModal,isModalVisible } = useModal(); 
  return (
    <>
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
      {/* Home Tab */}
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

      {/* Add Task - Opens Modal Instead of Navigating */}
      <Tabs.Screen
        name="taskadd"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault(); 
            openModal(); 
          },
        })}
        options={{
          title: "taskadd",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused || isModalVisible} size="35" icon={icons.icon_add} />
          ),
        }}
      />

      {/* Report Tab */}
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
    <TaskAdd/>
    </>
  );
};


export default function Layout() {
  return (
    <ModalProvider>
      <_layout />
    </ModalProvider>
  );
}