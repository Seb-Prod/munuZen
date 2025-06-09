/**
 * Hook personnalisé pour gérer le rafraîchissement du token d'accès via l'API.
 * 
 * Expose une fonction `submit` qui prend un token de rafraîchissement et effectue
 * l'appel API pour obtenir un nouveau token d'accès.
 * 
 * Gère automatiquement les états de chargement (`loading`), 
 * de données (`data` - résultat du rafraîchissement) et d'erreur (`error`).
 * 
 * @returns {
 *   submit: (token: string, onSuccess?, onError?) => Promise<void>,
 *   loading: boolean,
 *   data: RefreshTokenResult | null,
 *   error: string | null
 * }
 * 
 * @example
 * const { submit, loading, data, error } = useRefreshToken();
 * 
 * submit(refreshToken, 
 *        (data) => console.log("Token rafraîchi", data),
 *        (message) => console.error("Erreur", message));
 */
import { RefreshTokenResult } from "@/types/user";
import { useState } from "react";
import { refreshToken } from "@/services/authServices";
import { handleApiError } from "@/utils/handleApiError";

export function useRefreshToken() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<RefreshTokenResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function submit(
        token: string,
        onSuccess?: (data: RefreshTokenResult) => void,
        onError?: (message: string) => void
    ) {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await refreshToken(token);
            if (response.statusCode === 200 && response.data?.data) {
                const newData = response.data.data;
                setData(newData);
                if (onSuccess) onSuccess(newData); // ✅ ici
            } else {
                const message = response.data?.message || "Une erreur inconnue s'est produite.";
                setError(message);
                if (onError) onError(message); // ✅ ici aussi
            }
        } catch (err: any) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            if (onError) onError(errorMessage); // ✅ ici encore
        } finally {
            setLoading(false);
        }
    }

    return { submit, loading, data, error };
}