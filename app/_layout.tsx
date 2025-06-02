import { NavBar } from "@/components/NavBar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Stack } from "expo-router";
import { View, StyleSheet, useColorScheme } from "react-native"

export default function RootLayout() {
  const theme = useColorScheme() ?? "light"; 
  const colors = useThemeColors();

  return (
    <View key={theme} style={[styles.container]}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <View style={[styles.navbarContainer, {backgroundColor:colors.blanc}]}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom:15,
    paddingTop:10,
    borderRadius:5,
  },
});