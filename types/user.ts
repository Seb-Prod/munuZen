/**
   * Données retournées à la connexion
   */
export interface LoginResult {
  id_user: number;
  username: string;
  email: string;
  role: string;
  token: string;
}

export interface RegisterResult{
  token: string;
  username:string;
  email: string;
}