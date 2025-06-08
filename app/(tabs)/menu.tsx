import { Button } from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { BottomModal } from "@/components/BottomModal";
import { AuthModalContent } from "@/components/AuthModalContent";
import { useUser } from "@/contexts/UserContext";
import { router } from "expo-router";
import { ROUTES } from "@/constants/Routes";
import { Section } from "@/components/Section";
import { MenuItem } from "@/components/MenuItem";

export default function Menu() {
  const colors = useThemeColors();
  const { role, pseudo, resetUser } = useUser();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLogin(!!pseudo);
    setIsAdmin(role === "admin");
  }, [pseudo, role]);


  const handleLogin = () => setModalVisible(true);
  const handleLogout = () => {
    resetUser();
    setIsAdmin(false); // <-- important pour forcer la mise à jour
  };
  const closeModal = () => setModalVisible(false);

  const openRoute = (route: any) => router.replace(route);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <Button
        label={isLogin ? "Déconnexion" : "Connexion"}
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
        onPress={isLogin ? handleLogout : handleLogin}
        backgroundColor={isLogin ? "rouge" : "vert"}
      />

      {/* Section : App */}
      <Section title="Application">
        <MenuItem label="À propos" isLast={true} onPress={() => openRoute(ROUTES.ABOUT)} />
      </Section>

      {/* Section : Support */}
      <Section title="Support">
        <MenuItem label="Nous contacter" onPress={() => openRoute(ROUTES.CONTACT)} />
        <MenuItem label="Conditions d'utilisations" isLast={true} onPress={() => openRoute(ROUTES.TERMSOFUSE)} />
      </Section>

      {/* Section : Admin (uniquement pour les admins) */}
      {isAdmin && (
        <Section title="Administrateur">
          <MenuItem label="Gérer les comptes utilisateur" isLast={true} onPress={() => openRoute(ROUTES.ABOUT)} />
        </Section>
      )}

      {/* Modal login */}
      <BottomModal visible={isModalVisible} onClose={closeModal} backgroundColor={colors.fondNavBar}>
        <AuthModalContent />
      </BottomModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  sectionContent: {
    borderRadius: 10,
    paddingVertical: 10,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Ombre Android
    elevation: 3,
  },
  menuItem: {
    marginHorizontal:10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
});