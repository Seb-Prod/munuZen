import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";

export default function Recipes() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText variant="headline">Ajouter une recette</ThemedText>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})