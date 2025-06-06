import { RoutePath } from "@/constants/Routes";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
  link: RoutePath;
};

export function BackButton({ link }: Props) {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: link }} asChild>
      <TouchableOpacity style={styles.container}>
        <Ionicons
          name="chevron-back-circle-outline"
          size={24}
          color={colors.vert} 
        />
        <ThemedText color="vert" style={styles.label}>Retour</ThemedText>
        
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  label:{
    margin:5,
  }
});
