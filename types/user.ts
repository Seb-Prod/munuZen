/**
   * Données retournées à la connexion
   */
export interface LoginResult {
  id_user: number;
  username: string;
  email: string;
  role: string;
  token: string;
  refresh_token:string;
  token_expires_at:string;
  refresh_token_expires_at:string;
}

export interface RefreshTokenResult{
  token: string;
  refresh_token:string;
  token_expires_at:string;
  refresh_token_expires_at:string;
}

export interface RegisterResult{
  token: string;
  username:string;
  email: string;
}