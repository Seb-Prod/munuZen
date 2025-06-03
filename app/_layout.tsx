import { NavBar } from "@/components/NavBar/NavBar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Stack } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const theme = useColorScheme() ?? "light";
  const colors = useThemeColors();

  return (
    <View key={theme} style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <SafeAreaView style={[styles.safeArea]}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaView>

      <View style={[styles.navbarContainer, { backgroundColor: colors.fondNavBar }]}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 25,
    paddingTop: 10,
    borderRadius: 5,
  },
});