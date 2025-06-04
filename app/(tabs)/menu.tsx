import { Button } from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomModal } from "@/components/BottomModal";
import { AuthModalContent } from "@/components/auth/AuthModalContent";

export default function Menu() {
  const colors = useThemeColors();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <Button
        label="Connexion"
        style={{ alignSelf: "flex-end" }}
        onPress={handleLogin}
      />

      <BottomModal visible={isModalVisible} onClose={closeModal} backgroundColor={colors.fondNavBar}>
        <AuthModalContent />
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});