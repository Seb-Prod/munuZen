import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Screen() {
  const colors =useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <ThemedText variant="headline" color="vert">Mon planning</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
  }
})
