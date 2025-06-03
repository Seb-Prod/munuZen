
import { AuthModalContent } from "@/components/auth/AuthModalContent";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.ivoire }]}>
      
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
