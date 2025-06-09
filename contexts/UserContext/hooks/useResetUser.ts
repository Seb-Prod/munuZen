import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { STORAGE_KEYS } from "../constants";

/**
 * Hook qui retourne une fonction permettant de réinitialiser
 * complètement les données utilisateur en mémoire **et** dans le stockage local.
 *
 * Cette fonction est idéale à appeler lors de la déconnexion d'un utilisateur.
 *
 * @param setToken - Fonction pour vider le token d'accès en mémoire.
 * @param setTokenExpiresAt - Fonction pour vider la date d’expiration du token.
 * @param setRefreshToken - Fonction pour vider le refresh token.
 * @param setRefreshTokenExpiresAt - Fonction pour vider la date d’expiration du refresh token.
 * @param setEmail - Fonction pour réinitialiser l’e-mail utilisateur.
 * @param setPseudo - Fonction pour réinitialiser le pseudo utilisateur.
 * @param setRole - Fonction pour réinitialiser le rôle utilisateur.
 * @returns Une fonction asynchrone à appeler pour réinitialiser complètement l’état utilisateur.
 */
export const useResetUser = (
  setToken: (token: string | null) => void,
  setTokenExpiresAt: (expiresAt: number | null) => void,
  setRefreshToken: (token: string | null) => void,
  setRefreshTokenExpiresAt: (expiresAt: number | null) => void,
  setEmail: (email: string) => void,
  setPseudo: (pseudo: string) => void,
  setRole: (role: string) => void
) => {
  return useCallback(async () => {
    //console.log("useResetUser.ts", "Réinitialisation des données utilisateur.");

    try {
      // --- Réinitialisation des états React (en mémoire) ---
      setToken(null);
      setTokenExpiresAt(null);
      setRefreshToken(null);
      setRefreshTokenExpiresAt(null);
      setEmail("");
      setPseudo("");
      setRole("");

      // --- Suppression des données persistées dans AsyncStorage ---
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));

      // --- Notification de déconnexion réussie ---
      Toast.show({
        type: "info",
        text1: "Déconnexion",
        text2: "Vous avez été déconnecté(e).",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // --- Gestion des erreurs lors de la réinitialisation ---
      //console.error("useResetUser.ts", "Erreur lors de la réinitialisation :", error);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Impossible de se déconnecter.",
      });
    }
  }, [
    setToken,
    setTokenExpiresAt,
    setRefreshToken,
    setRefreshTokenExpiresAt,
    setEmail,
    setPseudo,
    setRole,
  ]);
};