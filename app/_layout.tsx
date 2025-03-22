import { Stack } from "expo-router";
import "./globals.css";
import { useCustomFonts } from "@/utils/font";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#ffff",
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="taskdetails"        
        options={{
          headerShown: false,
          
        }}
      />
    </Stack>
  );
}
