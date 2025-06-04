import { loginUser } from "@/services/userServices";
import { AuthResult } from "@/types/user";
import { handleApiError } from "@/utils/handleApiError";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string, password: string) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await loginUser(email, password);

      if (response.statusCode === 200 && response.data?.data) {
        setData(response.data.data);
      } else if (response.statusCode === 422) {
        setError('Veuillez corriger les erreurs dans le formulaire');
      } else {
        setError('Échec de la connexion. Veuillez réessayer');
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, data, error };
}