/**
 * Interface représentant le contexte utilisateur.
 * 
 * Contient les données de session (tokens, informations utilisateur)
 * ainsi que les setters permettant de modifier ces données dans le contexte React.
 */
export interface UserContextType {
  /** Token d'accès JWT ou autre type de token d'authentification */
  token: string | null;

  /** Timestamp UNIX (en ms) indiquant la date d'expiration du token d'accès */
  tokenExpiresAt: number | null;

  /** Token utilisé pour rafraîchir le token d'accès */
  refreshToken: string | null;

  /** Timestamp UNIX (en ms) indiquant la date d'expiration du token de rafraîchissement */
  refreshTokenExpiresAt: number | null;

  /** Adresse email de l'utilisateur connecté */
  email: string;

  /** Pseudo ou nom d'affichage de l'utilisateur */
  pseudo: string;

  /** Rôle de l'utilisateur (ex: "admin", "user", etc.) */
  role: string;

  /**
   * Setter pour mettre à jour le token d'accès dans le contexte
   * @param token - Nouvelle valeur du token ou null pour le supprimer
   */
  setToken: (token: string | null) => void;

  /**
   * Setter pour mettre à jour la date d'expiration du token d'accès
   * @param expiresAt - Timestamp UNIX (ms) ou null
   */
  setTokenExpiresAt: (expiresAt: number | null) => void;

  /**
   * Setter pour mettre à jour le token de rafraîchissement
   * @param token - Nouvelle valeur du refresh token ou null
   */
  setRefreshToken: (token: string | null) => void;

  /**
   * Setter pour mettre à jour la date d'expiration du refresh token
   * @param expiresAt - Timestamp UNIX (ms) ou null
   */
  setRefreshTokenExpiresAt: (expiresAt: number | null) => void;

  /**
   * Setter pour mettre à jour l'email de l'utilisateur
   * @param email - Nouvelle adresse email
   */
  setEmail: (email: string) => void;

  /**
   * Setter pour mettre à jour le pseudo de l'utilisateur
   * @param pseudo - Nouveau pseudo
   */
  setPseudo: (pseudo: string) => void;

  /**
   * Setter pour mettre à jour le rôle de l'utilisateur
   * @param role - Nouveau rôle
   */
  setRole: (role: string) => void;

  /**
   * Fonction permettant de réinitialiser toutes les données utilisateur
   * (généralement utilisée lors de la déconnexion)
   * @returns {Promise<void>} Promise résolue une fois la réinitialisation terminée
   */
  resetUser: () => Promise<void>;
}