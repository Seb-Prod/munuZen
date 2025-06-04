import { loginUser } from "@/services/userServices";
import { AuthResult } from "@/types/user";
import { handleApiError } from "@/utils/handleApiError";
import { useState } from "react";

// Fonction utilitaire
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuthResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(email: string, password: string) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      await wait(5000); // Simule une connexion lente

      const response = await loginUser(email, password);
      console.log(response)
      if (response.statusCode === 200 && response.data?.data) {
        setData(response.data.data);
      } else {
        const message =
          response.data?.message || "Une erreur inconnue s'est produite.";
        setError(message);
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