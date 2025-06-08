import { useThemeColors } from "@/hooks/useThemeColors";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props {
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

export const MenuItem: React.FC<Props> = ({ label, onPress, isLast }) => {
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.menuItem,
      {
        borderBottomColor: colors.separateur,
        borderBottomWidth: isLast ? 0 : 1,
      }]}>
      <ThemedText>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  sectionContent: {
    borderRadius: 10,
    paddingVertical: 10,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Ombre Android
    elevation: 3,
  },
  menuItem: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
  },
});