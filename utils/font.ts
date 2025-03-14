import { useFonts, Rubik_400Regular, Rubik_700Bold,Rubik_500Medium } from "@expo-google-fonts/rubik";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    RubikPrimary: Rubik_400Regular,
    RubikBold: Rubik_700Bold,
    RubikMedium:Rubik_500Medium
  });

  return fontsLoaded;
};
