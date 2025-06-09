import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { ROUTES } from "@/constants/Routes";

interface Params {
  data: any;
  isSignup: boolean;
  rememberMe: boolean;
  setToken: (token: string) => void;
  setTokenExpiresAt: (value: number) => void;
  setRefreshToken: (value: string) => void;
  setRefreshTokenExpiresAt: (value: number) => void;
  setEmail: (email: string) => void;
  setPseudo: (pseudo: string) => void;
  setRole: (role: string) => void;
  resetLogin: () => void;
  resetSignup: () => void;
  setIsSignup: (value: boolean) => void;
  setShowEmailModal: (value: boolean) => void;
}

// Optionnel: centralise les clés pour éviter les erreurs de typo
const STORAGE_KEYS = {
  token: "userToken",
  token_expires_at: "token_expires_at",
  refresh_token: "refresh_token",
  refresh_token_expires_at: "refresh_token_expires_at",
  email: "userEmail",
  pseudo: "userPseudo",
  role: "role",
  rememberMe: "rememberMe",
};

export const useHandleAuthEffect = ({
  data,
  isSignup,
  rememberMe,
  setToken,
  setTokenExpiresAt,
  setRefreshToken,
  setRefreshTokenExpiresAt,
  setEmail,
  setPseudo,
  setRole,
  resetLogin,
  resetSignup,
  setIsSignup,
  setShowEmailModal,
}: Params) => {
  useEffect(() => {
    if (!data) return;

    const handleAuth = async () => {
      const message = isSignup ? "Compte créé avec succès !" : "Connexion réussie !";

      Toast.show({
        type: "success",
        text1: "Succès",
        text2: message,
      });

      if (!isSignup) {
        // Assure-toi que toutes les données importantes sont présentes
        if (
          data.token &&
          data.token_expires_at != null &&
          data.refresh_token &&
          data.refresh_token_expires_at != null &&
          data.email &&
          data.username &&
          data.role
        ) {
          // Mise à jour du contexte utilisateur
          setToken(data.token);
          setTokenExpiresAt(data.token_expires_at * 1000);
          setRefreshToken(data.refresh_token);
          setRefreshTokenExpiresAt(data.refresh_token_expires_at * 1000);
          setEmail(data.email);
          setPseudo(data.username);
          setRole(data.role);

          if (rememberMe) {
            await AsyncStorage.multiSet([
              [STORAGE_KEYS.token, data.token],
              [STORAGE_KEYS.token_expires_at, String(data.token_expires_at * 1000)],
              [STORAGE_KEYS.refresh_token, data.refresh_token],
              [STORAGE_KEYS.refresh_token_expires_at, String(data.refresh_token_expires_at * 1000)],
              [STORAGE_KEYS.email, data.email],
              [STORAGE_KEYS.pseudo, data.username],
              [STORAGE_KEYS.role, data.role],
              [STORAGE_KEYS.rememberMe, "true"],
            ]);
          } else {
            // Nettoyage des données stockées si "remember me" est désactivé
            await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
          }
        }
      }

      // Actions post-authentification
      if (!isSignup) {
        resetLogin();
        setTimeout(() => {
          router.replace(ROUTES.PLANNING);
        }, 500);
      } else {
        resetSignup();
        setIsSignup(false);
        setShowEmailModal(true);
      }
    };

    handleAuth();
  }, [
    data,
    isSignup,
    rememberMe,
    setToken,
    setTokenExpiresAt,
    setRefreshToken,
    setRefreshTokenExpiresAt,
    setEmail,
    setPseudo,
    setRole,
    resetLogin,
    resetSignup,
    setIsSignup,
    setShowEmailModal,
  ]);
};