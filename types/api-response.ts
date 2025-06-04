/**
 * Réponse générique enveloppant n'importe quel type de données
 */
export interface ApiResponse<T> {
    statusCode: number;
    data: T | null;
}

export type ApiDataWrapper<T> = {
  data: T;
  message?: string;
  status?: string;
};