import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Recipes() {
  const colors =useThemeColors();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.ivoire}]}>
      <ThemedText variant="headline">MenuZen</ThemedText>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})