
import { AuthModalContent } from "@/components/auth/AuthModalContent";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { Button, Modal, SafeAreaView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <Button
        title="Show Toast"
        onPress={() =>
          Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'Ceci est un test'
          })
        }
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
