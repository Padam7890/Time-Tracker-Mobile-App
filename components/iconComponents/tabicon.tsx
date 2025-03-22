import { Image, View } from "react-native";

// Tab Icon Component
export default function TabIcon({ focused, icon, size }: any) {
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