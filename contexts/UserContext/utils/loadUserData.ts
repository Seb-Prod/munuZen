import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { STORAGE_KEYS } from "../constants";

/**
 * Crée une fonction asynchrone qui charge les données utilisateur depuis AsyncStorage
 * et met à jour les états correspondants via les setters passés en paramètre.
 * 
 * Cette fonction gère notamment la récupération des tokens, des dates d'expiration,
 * ainsi que des informations utilisateur (email, pseudo, rôle).
 * Si l'utilisateur n'a pas activé la mémoire ("rememberMe" !== "true"), elle supprime
 * toutes les données stockées liées à l'utilisateur.
 * 
 * @param {(token: string | null) => void} setToken - Setter pour le token d'accès
 * @param {(expiresAt: number | null) => void} setTokenExpiresAt - Setter pour la date d'expiration du token
 * @param {(token: string | null) => void} setRefreshToken - Setter pour le token de rafraîchissement
 * @param {(expiresAt: number | null) => void} setRefreshTokenExpiresAt - Setter pour la date d'expiration du token de rafraîchissement
 * @param {(email: string) => void} setEmail - Setter pour l'email utilisateur
 * @param {(pseudo: string) => void} setPseudo - Setter pour le pseudo utilisateur
 * @param {(role: string) => void} setRole - Setter pour le rôle utilisateur
 * 
 * @returns {() => Promise<void>} Fonction asynchrone qui charge les données utilisateur
 */
export const createLoadUserData = (
  setToken: (token: string | null) => void,
  setTokenExpiresAt: (expiresAt: number | null) => void,
  setRefreshToken: (token: string | null) => void,
  setRefreshTokenExpiresAt: (expiresAt: number | null) => void,
  setEmail: (email: string) => void,
  setPseudo: (pseudo: string) => void,
  setRole: (role: string) => void
) => {
  return async () => {
    try {
      // Vérifie si l'utilisateur a choisi de se souvenir de la session
      const remember = await AsyncStorage.getItem(STORAGE_KEYS.rememberMe);

      if (remember !== "true") {
        // Si non, on supprime toutes les données stockées liées à l'utilisateur
        //console.log("loadUserData.ts", "'rememberMe' est false ou non défini. Suppression des anciennes données.");
        await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
        return;
      }

      // Récupération parallèle des différentes données stockées
      const [
        storedToken,
        storedTokenExpiresAt,
        storedRefreshToken,
        storedRefreshTokenExpiresAt,
        storedEmail,
        storedPseudo,
        storedRole,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.token),
        AsyncStorage.getItem(STORAGE_KEYS.tokenExpiresAt),
        AsyncStorage.getItem(STORAGE_KEYS.refreshToken),
        AsyncStorage.getItem(STORAGE_KEYS.refreshTokenExpiresAt),
        AsyncStorage.getItem(STORAGE_KEYS.email),
        AsyncStorage.getItem(STORAGE_KEYS.pseudo),
        AsyncStorage.getItem(STORAGE_KEYS.role),
      ]);

      // Mise à jour des états si les valeurs existent
      if (storedToken) setToken(storedToken);
      if (storedTokenExpiresAt) setTokenExpiresAt(parseInt(storedTokenExpiresAt, 10));
      if (storedRefreshToken) setRefreshToken(storedRefreshToken);
      if (storedRefreshTokenExpiresAt) setRefreshTokenExpiresAt(parseInt(storedRefreshTokenExpiresAt, 10));
      if (storedEmail) setEmail(storedEmail);
      if (storedPseudo) setPseudo(storedPseudo);
      if (storedRole) setRole(storedRole);

      console.log("[UserContext] Données utilisateur chargées.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Gestion des erreurs avec message toast et log console
      //console.error("loadUserData.ts", "Erreur au chargement des données initiales :", error);
      Toast.show({
        type: "error",
        text1: "Erreur de chargement",
        text2: "Impossible de charger les données de session.",
      });
    }
  };
};