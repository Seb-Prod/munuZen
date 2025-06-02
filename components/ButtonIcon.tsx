import { Link } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { RoutePath } from "@/constants/Routes";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  link: RoutePath;
  active?: boolean;
};

export function ButtonIcon({ iconName, label, link, active = false }: Props) {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: link }} asChild>
      <Pressable style={styles.container}>
        <Ionicons
          name={iconName}
          size={24}
          color={active ? colors.vert : "#888"} 
        />
        <Text style={[styles.label, { color: active ? colors.vert : "#888" }]}>
          {label}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  }
});