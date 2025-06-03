import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Recipes() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText variant="headline" color="jaune">Ajouter une recette</ThemedText>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})