import { Button } from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomModal } from "@/components/BottomModal";
import { AuthModalContent } from "@/components/AuthModalContent";
import { useUser } from "@/contexts/UserContext";
import { Link, router } from "expo-router";
import { ROUTES } from "@/constants/Routes";

export default function Menu() {
  const colors = useThemeColors();
 const { token, email, pseudo, resetUser } = useUser();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (pseudo) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [pseudo]);

  const handleLogin = () => {
    setModalVisible(true);
  };

   const handleLogout = () => {
    resetUser();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <Button
        label={isLogin ? "Déconnexion" : "Connexion"}
        style={{ alignSelf: "flex-end" }}
        onPress={isLogin ? handleLogout : handleLogin}
        backgroundColor={isLogin ? "rouge": "vert"}
      />

      
        <Button
          label="À propos"
          style={{ marginTop: 20, alignSelf: "center" }} onPress={() => router.replace(ROUTES.ABOUT)}      />
     

      <BottomModal visible={isModalVisible} onClose={closeModal} backgroundColor={colors.fondNavBar}>
        <AuthModalContent/>
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