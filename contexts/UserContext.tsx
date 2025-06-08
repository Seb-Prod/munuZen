import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Clés centralisées pour éviter les erreurs de frappe
const STORAGE_KEYS = {
  token: "userToken",
  email: "userEmail",
  pseudo: "userPseudo",
  role: "role",
  rememberMe: "rememberMe",
};

interface UserContextType {
  token: string | null;
  email: string;
  pseudo: string;
  role:string;
  setToken: (token: string | null) => void;
  setEmail: (email: string) => void;
  setPseudo: (pseudo: string) => void;
  setRole: (role: string) =>void;
  resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [pseudo, setPseudo] = useState<string>("");
  const [role, setRole] = useState<string>("");

  // Chargement initial des données utilisateur
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const remember = await AsyncStorage.getItem(STORAGE_KEYS.rememberMe);

        if (remember !== "true") {
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.token,
            STORAGE_KEYS.email,
            STORAGE_KEYS.pseudo,
            STORAGE_KEYS.role,
            STORAGE_KEYS.rememberMe,
          ]);
          return; // on ne charge rien
        }

        const [storedToken, storedEmail, storedPseudo, storedRole] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.token),
          AsyncStorage.getItem(STORAGE_KEYS.email),
          AsyncStorage.getItem(STORAGE_KEYS.pseudo),
          AsyncStorage.getItem(STORAGE_KEYS.role),
        ]);

        if (storedToken) setToken(storedToken);
        if (storedEmail) setEmail(storedEmail);
        if (storedPseudo) setPseudo(storedPseudo);
        if (storedRole) setRole(storedRole);
      } catch (error) {
        console.error("[UserContext] Erreur au chargement des données :", error);
      }
    };

    loadUserData();
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (token) {
          await AsyncStorage.setItem(STORAGE_KEYS.token, token);
        } else {
          await AsyncStorage.removeItem(STORAGE_KEYS.token);
        }

        await AsyncStorage.setItem(STORAGE_KEYS.email, email);
        await AsyncStorage.setItem(STORAGE_KEYS.pseudo, pseudo);
        await AsyncStorage.setItem(STORAGE_KEYS.role, role);
      } catch (error) {
        console.error("[UserContext] Erreur à la sauvegarde des données :", error);
      }
    };

    saveUserData();
  }, [token, email, pseudo, role]);

  // Réinitialisation complète
  const resetUser = async () => {
    try {
      setToken(null);
      setEmail("");
      setPseudo("");
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.token,
        STORAGE_KEYS.email,
        STORAGE_KEYS.pseudo,
        STORAGE_KEYS.role,
      ]);
    } catch (error) {
      console.error("[UserContext] Erreur lors de la réinitialisation :", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, pseudo, role, setToken, setEmail, setPseudo, resetUser, setRole }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};