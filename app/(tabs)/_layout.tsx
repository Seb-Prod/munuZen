// app/(tabs)/_layout.tsx
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { NavBar } from "@/components/NavBar/NavBar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
      {/* Zone protégée (top, notch, etc.) */}
      <SafeAreaView style={styles.content} edges={["top", "left", "right"]}>
        <Slot />
      </SafeAreaView>

      {/* NavBar hors safe area (au ras du bas de l'écran) */}
      <View style={[styles.navbar, { backgroundColor: colors.fondNavBar }]}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navbar: {
    paddingTop: 10,
    paddingBottom: 25, // ajoute éventuellement un `paddingBottom` si tu veux éviter un chevauchement avec la gesture bar sur iOS
  },
});