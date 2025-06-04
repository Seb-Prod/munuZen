/**
   * Données retournées à la connexion
   */
  export interface AuthResult {
  id_user: number;
  username: string;
  email: string;
  role: string;
  token: string;
}