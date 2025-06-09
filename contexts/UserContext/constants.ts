/**
 * Clés utilisées pour stocker et récupérer les données utilisateur dans AsyncStorage.
 * 
 * Chaque clé correspond à une donnée spécifique liée à la session ou à l'utilisateur.
 */
export const STORAGE_KEYS = {
  /** Clé du token d'accès */
  token: "userToken",

  /** Clé de la date d'expiration du token d'accès (timestamp en ms) */
  tokenExpiresAt: "tokenExpiresAt",

  /** Clé du token de rafraîchissement */
  refreshToken: "refreshToken",

  /** Clé de la date d'expiration du token de rafraîchissement (timestamp en ms) */
  refreshTokenExpiresAt: "refreshTokenExpiresAt",

  /** Clé de l'adresse email de l'utilisateur */
  email: "userEmail",

  /** Clé du pseudo de l'utilisateur */
  pseudo: "userPseudo",

  /** Clé du rôle de l'utilisateur */
  role: "userRole",

  /** Clé indiquant si l'utilisateur a activé la mémorisation de la session */
  rememberMe: "rememberMe",
};