import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";
import { UserContextType } from "./types";
import { createLoadUserData, createSaveUserData } from "./utils";
import { useRefreshAccessToken, useResetUser, useTokenAutoRefresh, useTokenChecker } from "./hooks";

/**
 * Contexte React pour les données utilisateur et leurs setters.
 * Typé avec l'interface UserContextType.
 */
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provider qui englobe l’application pour fournir les données utilisateur et gérer leur cycle de vie :
 * - chargement initial depuis le stockage local,
 * - sauvegarde automatique des données,
 * - gestion des tokens (rafraîchissement, expiration),
 * - gestion des infos utilisateur (email, pseudo, rôle).
 * 
 * @param {object} props
 * @param {ReactNode} props.children - Composants enfants accédant au contexte utilisateur
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [refreshTokenExpiresAt, setRefreshTokenExpiresAt] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [pseudo, setPseudo] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const { submit } = useRefreshToken();

  const resetUser = useResetUser(
    setToken,
    setTokenExpiresAt,
    setRefreshToken,
    setRefreshTokenExpiresAt,
    setEmail,
    setPseudo,
    setRole
  );

  const refreshAccessToken = useRefreshAccessToken(
    refreshToken,
    refreshTokenExpiresAt,
    resetUser,
    submit,
    setToken,
    setTokenExpiresAt,
    setRefreshToken,
    setRefreshTokenExpiresAt
  );

  // Chargement initial des données utilisateur
  useEffect(() => {
    const loadUserData = createLoadUserData(
      setToken,
      setTokenExpiresAt,
      setRefreshToken,
      setRefreshTokenExpiresAt,
      setEmail,
      setPseudo,
      setRole
    );
    loadUserData();
  }, []);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    const saveUserData = createSaveUserData(
      token,
      tokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      email,
      pseudo,
      role
    );
    saveUserData();
  }, [token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt, email, pseudo, role]);

  // Vérifie si le token est expiré et tente un rafraîchissement
  useTokenChecker(token, tokenExpiresAt, refreshAccessToken);

  // Rafraîchissement automatique 30 secondes avant expiration
  useTokenAutoRefresh(token, tokenExpiresAt, refreshAccessToken);

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

/**
 * Hook personnalisé pour accéder au contexte utilisateur.
 * 
 * @throws {Error} si utilisé hors d’un UserProvider
 * @returns {UserContextType} données et méthodes utilisateur
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
};