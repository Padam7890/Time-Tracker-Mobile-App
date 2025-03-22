import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import HomePage from "@/components/homepage";
import NotificationProvider from "@/hooks/notification";

const index = () => {
  return (
    <>
      <NotificationProvider>
        <HomePage />
      </NotificationProvider>
    </>
  );
};

export default index;
