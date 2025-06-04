import { RegisterResult } from './../../types/user';
import { resendActivationEmail } from "@/services/authServices";
import { handleApiError } from "@/utils/handleApiError";
import { useState } from "react";

export function useResendActivationEmail() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<RegisterResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function submit(email: string) {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const response = await resendActivationEmail(email);
            console.log(response)
            if (response.statusCode === 201 && response.data?.data) {
                setData(response.data.data);
            } else {
                const rawMessage = response.data?.message;

                let message = "Une erreur inconnue s'est produite.";
                if (typeof rawMessage === "string") {
                    message = rawMessage;
                } else if (typeof rawMessage === "object" && rawMessage !== null) {
                    // Concatène tous les messages d’erreur
                    message = Object.values(rawMessage).join("\n");
                }
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