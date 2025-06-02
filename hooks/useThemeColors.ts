import { useColorScheme } from "react-native";
import { Colors, getSafeTheme } from "@/constants/Colors";

export function useThemeColors() {
  const theme = getSafeTheme(useColorScheme());
  return Colors[theme];
}