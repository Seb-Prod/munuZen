import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Toast from "react-native-toast-message"
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";

// --- 1. Clés de Stockage Centralisées ---
// C'est une excellente pratique pour gérer toutes vos clés AsyncStorage.
// Cela rend le code plus propre et moins sujet aux erreurs.
const STORAGE_KEYS = {
  token: "userToken",
  tokenExpiresAt: "tokenExpiresAt", // Timestamp en ms (number)
  refreshToken: "refreshToken",
  refreshTokenExpiresAt: "refreshTokenExpiresAt", // Timestamp en ms (number)
  email: "userEmail",
  pseudo: "userPseudo",
  role: "userRole",
  rememberMe: "rememberMe", // "true" ou "false"
};

// --- 2. Interface du Contexte Utilisateur ---
// Définit la structure des données et des fonctions exposées par le contexte.
interface UserContextType {
  token: string | null;
  tokenExpiresAt: number | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: number | null;
  email: string;
  pseudo: string;
  role: string;
  setToken: (token: string | null) => void;
  setTokenExpiresAt: (expiresAt: number | null) => void;
  setRefreshToken: (token: string | null) => void;
  setRefreshTokenExpiresAt: (expiresAt: number | null) => void;
  setEmail: (email: string) => void;
  setPseudo: (pseudo: string) => void;
  setRole: (role: string) => void;
  resetUser: () => Promise<void>;
}

// Création du contexte React
const UserContext = createContext<UserContextType | undefined>(undefined);

// --- 3. Provider du Contexte Utilisateur ---
// Ce composant encapsule les parties de votre application ayant besoin des données utilisateur.
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [refreshTokenExpiresAt, setRefreshTokenExpiresAt] = useState<
    number | null
  >(null);
  const [email, setEmail] = useState<string>("");
  const [pseudo, setPseudo] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const { submit, data } = useRefreshToken();

  // --- Réinitialisation Complète de l'Utilisateur (Déconnexion) ---
  const resetUser = useCallback(async () => {
    console.log("[UserContext] Réinitialisation des données utilisateur.");
    try {
      setToken(null);
      setTokenExpiresAt(null);
      setRefreshToken(null);
      setRefreshTokenExpiresAt(null);
      setEmail("");
      setPseudo("");
      setRole("");
      // Supprimer toutes les données liées à l'utilisateur d'AsyncStorage
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
      Toast.show({
        type: "info",
        text1: "Déconnexion",
        text2: "Vous avez été déconnecté(e).",
      });
    } catch (error) {
      console.error(
        "[UserContext] Erreur lors de la réinitialisation :",
        error
      );
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Impossible de se déconnecter.",
      });
    }
  }, []);

  // --- 5. Fonction de Rafraîchissement du Token d'Accès ---
  // Gère la tentative de récupération d'un nouveau token d'accès via le refresh token.
  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (!refreshToken) {
      console.warn("[UserContext] Pas de refresh token disponible.");
      return false;
    }

    // Vérifier si le refresh token a lui-même expiré
    const now = Date.now();
    if (refreshTokenExpiresAt && now >= refreshTokenExpiresAt) {
      console.warn("[UserContext] Le refresh token a expiré. Déconnexion.");
      resetUser();
      Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.");
      return false;
    }

    try {
      let success = false;

      await submit(
        refreshToken,
        (newData) => {
          setToken(newData.token);
          setTokenExpiresAt(newData.token_expires_at ? parseInt(newData.token_expires_at, 10)*1000 : null);

          if (newData.refresh_token) {
            setRefreshToken(newData.refresh_token);
            setRefreshTokenExpiresAt(newData.refresh_token_expires_at ? parseInt(newData.refresh_token_expires_at, 10)*1000 : null);
          }

          console.log("[UserContext] Token rafraîchi via callback.");
          Toast.show({
            type: "success",
            text1: "Session mise à jour",
            text2: "Votre session a été prolongée.",
          });

          success = true;
        },
        (message) => {
          console.warn("[UserContext] Rafraîchissement échoué :", message);
          Toast.show({
            type: "error",
            text1: "Problème de session",
            text2: message,
          });
        }
      );

      if (!success) {
        resetUser();
        Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.");
      }

      return success;
    } catch (error) {
      console.error("[UserContext] Erreur pendant le refresh via hook :", error);
      Toast.show({
        type: "error",
        text1: "Problème de session",
        text2: "Impossible de rafraîchir la session.",
      });
      return false;
    }
  }, [refreshToken, refreshTokenExpiresAt, resetUser, submit]);

  // --- 6. Chargement Initial des Données Utilisateur ---
  // Se déclenche une seule fois au montage du provider.
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const remember = await AsyncStorage.getItem(STORAGE_KEYS.rememberMe);

        // Si "rememberMe" n'est pas "true", on ne charge rien et on efface tout.
        // Cela gère le cas où l'utilisateur a décoché "se souvenir de moi".
        if (remember !== "true") {
          console.log("[UserContext] 'rememberMe' est false ou non défini. Suppression des anciennes données.");
          await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
          return;
        }

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

        // Mettre à jour les states seulement si les données existent
        if (storedToken) setToken(storedToken);
        // Convertir les timestamps en nombres
        if (storedTokenExpiresAt) setTokenExpiresAt(parseInt(storedTokenExpiresAt, 10));
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);
        if (storedRefreshTokenExpiresAt) setRefreshTokenExpiresAt(parseInt(storedRefreshTokenExpiresAt, 10));
        if (storedEmail) setEmail(storedEmail);
        if (storedPseudo) setPseudo(storedPseudo);
        if (storedRole) setRole(storedRole);

        console.log("[UserContext] Données utilisateur chargées.");
      } catch (error) {
        console.error(
          "[UserContext] Erreur au chargement des données initiales :",
          error
        );
        Toast.show({
          type: "error",
          text1: "Erreur de chargement",
          text2: "Impossible de charger les données de session.",
        });
      }
    };

    loadUserData();
  }, []); // Le tableau vide assure qu'il ne se déclenche qu'une fois au montage

  // --- 7. Sauvegarde Automatique des Données Utilisateur ---
  // Se déclenche à chaque modification des states liés aux données utilisateur.
  useEffect(() => {
    const saveUserData = async () => {
      try {
        // Enregistrer seulement si rememberMe est true, sinon ne rien faire ou supprimer
        const remember = await AsyncStorage.getItem(STORAGE_KEYS.rememberMe);

        if (remember === "true") {
          if (token) await AsyncStorage.setItem(STORAGE_KEYS.token, token);
          else await AsyncStorage.removeItem(STORAGE_KEYS.token);

          if (tokenExpiresAt) await AsyncStorage.setItem(STORAGE_KEYS.tokenExpiresAt, tokenExpiresAt.toString()); // Convertir en string
          else await AsyncStorage.removeItem(STORAGE_KEYS.tokenExpiresAt);

          if (refreshToken) await AsyncStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
          else await AsyncStorage.removeItem(STORAGE_KEYS.refreshToken);

          if (refreshTokenExpiresAt) await AsyncStorage.setItem(STORAGE_KEYS.refreshTokenExpiresAt, refreshTokenExpiresAt.toString()); // Convertir en string
          else await AsyncStorage.removeItem(STORAGE_KEYS.refreshTokenExpiresAt);

          await AsyncStorage.setItem(STORAGE_KEYS.email, email);
          await AsyncStorage.setItem(STORAGE_KEYS.pseudo, pseudo);
          await AsyncStorage.setItem(STORAGE_KEYS.role, role);
          console.log("[UserContext] Données utilisateur sauvegardées.");
        } else {
          // Si rememberMe n'est pas "true", s'assurer que les données ne sont pas persistantes.
          // Cela gère les changements de session sans "rememberMe".
          await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS).filter(key => key !== STORAGE_KEYS.rememberMe));
        }
      } catch (error) {
        console.error(
          "[UserContext] Erreur à la sauvegarde des données :",
          error
        );
        Toast.show({
          type: "error",
          text1: "Erreur de sauvegarde",
          text2: "Impossible de sauvegarder les données de session.",
        });
      }
    };

    saveUserData();
    // Dépendances : tous les states que vous souhaitez sauvegarder automatiquement.
  }, [token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt, email, pseudo, role]);

  // --- 8. Vérification de l'Expiration du Token (et Rafraîchissement) ---
  // Utilise un intervalle plus raisonnable et un "buffer" pour rafraîchir à l'avance.
  useEffect(() => {
    // Ne pas exécuter si le token ou sa date d'expiration manquent
    if (!token || !tokenExpiresAt) return;

    const checkTokenStatus = async () => {
      const now = Date.now();
      // Marge de temps avant l'expiration réelle pour tenter le rafraîchissement
      const REFRESH_BUFFER_MS = 5 * 60 * 1000; // 5 minutes

      if (now >= tokenExpiresAt - REFRESH_BUFFER_MS) {
        console.warn("[UserContext] Le token est proche de l'expiration ou a expiré. Tentative de rafraîchissement.");
        console.log("now", now);
        console.log("token", tokenExpiresAt)
        const success = await refreshAccessToken();
        if (!success) {
          // Si le rafraîchissement échoue, l'utilisateur est déconnecté par refreshAccessToken
          console.log("[UserContext] Rafraîchissement du token échoué ou refresh token expiré.");
        }
      }
    };

    // Exécuter la vérification immédiatement après le montage ou le changement de dépendances
    checkTokenStatus();

    // Définir un intervalle pour les vérifications périodiques (ex: toutes les 5 minutes)
    const intervalId = setInterval(checkTokenStatus, 5 * 60 * 1000); // Vérifie toutes les 5 minutes

    // Nettoyage de l'intervalle au démontage du composant ou avant un nouveau cycle de l'effet
    return () => clearInterval(intervalId);
  }, [token, tokenExpiresAt, refreshAccessToken]); // Dépendances importantes

  // --- 9. Valeur du Contexte Fournie aux Enfants ---
  return (
    <UserContext.Provider
      value={{
        token,
        tokenExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
        email,
        pseudo,
        role,
        setToken,
        setTokenExpiresAt,
        setRefreshToken,
        setRefreshTokenExpiresAt,
        setEmail,
        setPseudo,
        setRole,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// --- 10. Hook Personnalisé pour Utiliser le Contexte ---
// Simplifie l'accès aux données utilisateur et garantit que le hook est utilisé dans le Provider.
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    // Empêche l'utilisation du hook en dehors du UserProvider
    throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
};