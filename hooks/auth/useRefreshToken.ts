import { RefreshTokenResult } from "@/types/user";
import { useState } from "react";
import { refreshToken } from "@/services/authServices";
import { handleApiError } from "@/utils/handleApiError";

export function useRefreshToken() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<RefreshTokenResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function submit(token: string, onSuccess?: (data: RefreshTokenResult) => void, onError?: (message: string) => void) {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await refreshToken(token);
            //console.log(response);
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

    const reset = () => {
        setData(null);
        setError(null);
    };

    return { submit, loading, data, error, reset };
}