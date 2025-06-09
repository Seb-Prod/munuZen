import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { STORAGE_KEYS } from "../constants";

/**
 * Crée une fonction asynchrone qui sauvegarde les données de l'utilisateur
 * dans le stockage local sécurisé (`AsyncStorage`) **uniquement si l'utilisateur
 * a choisi d'être "retenu" (rememberMe = true)**.
 *
 * @param token - Token d'accès JWT.
 * @param tokenExpiresAt - Date d’expiration du token d’accès (timestamp en ms).
 * @param refreshToken - Token de rafraîchissement.
 * @param refreshTokenExpiresAt - Date d’expiration du token de rafraîchissement (timestamp en ms).
 * @param email - Adresse e-mail de l’utilisateur.
 * @param pseudo - Pseudo ou nom d’utilisateur.
 * @param role - Rôle de l’utilisateur (ex : "admin", "user", etc.).
 * @returns Une fonction asynchrone qui effectue la sauvegarde ou le nettoyage selon `rememberMe`.
 */
export const createSaveUserData = (
  token: string | null,
  tokenExpiresAt: number | null,
  refreshToken: string | null,
  refreshTokenExpiresAt: number | null,
  email: string,
  pseudo: string,
  role: string
) => {
  return async () => {
    try {
      // Vérifie si l'utilisateur a activé l'option "Se souvenir de moi"
      const remember = await AsyncStorage.getItem(STORAGE_KEYS.rememberMe);

      if (remember === "true") {
        // --- Sauvegarde des données si l'utilisateur veut être retenu ---

        // Token d'accès
        if (token) await AsyncStorage.setItem(STORAGE_KEYS.token, token);
        else await AsyncStorage.removeItem(STORAGE_KEYS.token);

        // Expiration du token d'accès
        if (tokenExpiresAt)
          await AsyncStorage.setItem(STORAGE_KEYS.tokenExpiresAt, tokenExpiresAt.toString());
        else await AsyncStorage.removeItem(STORAGE_KEYS.tokenExpiresAt);

        // Token de rafraîchissement
        if (refreshToken)
          await AsyncStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
        else await AsyncStorage.removeItem(STORAGE_KEYS.refreshToken);

        // Expiration du token de rafraîchissement
        if (refreshTokenExpiresAt)
          await AsyncStorage.setItem(STORAGE_KEYS.refreshTokenExpiresAt, refreshTokenExpiresAt.toString());
        else await AsyncStorage.removeItem(STORAGE_KEYS.refreshTokenExpiresAt);

        // Informations utilisateur
        await AsyncStorage.setItem(STORAGE_KEYS.email, email);
        await AsyncStorage.setItem(STORAGE_KEYS.pseudo, pseudo);
        await AsyncStorage.setItem(STORAGE_KEYS.role, role);

        //console.log("saveUserData.ts", "Données utilisateur sauvegardées.");
      } else {
        // --- Si l'utilisateur ne veut pas être retenu, on nettoie tout sauf rememberMe ---
        await AsyncStorage.multiRemove(
          Object.values(STORAGE_KEYS).filter((key) => key !== STORAGE_KEYS.rememberMe)
        );
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Gestion d'erreur : affiche un toast en cas de problème lors de la sauvegarde
      //console.error("saveUserData.ts", "Erreur à la sauvegarde des données :", error);
      Toast.show({
        type: "error",
        text1: "Erreur de sauvegarde",
        text2: "Impossible de sauvegarder les données de session.",
      });
    }
  };
};