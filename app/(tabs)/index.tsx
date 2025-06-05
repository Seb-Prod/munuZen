
import { useUser } from "@/contexts/UserContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { Text, SafeAreaView, StyleSheet, Button } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  const { token, email, pseudo, resetUser } = useUser();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <Text>Bienvenue {pseudo} ({email})</Text>
      <Button title="Se déconnecter" onPress={resetUser} />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
