import { useCallback } from "react";
import { validateAuthForm } from "@/components/AuthModalContent/functions/validation";

interface Params {
  formData: {
    email: string;
    pseudo: string;
    password: string;
    confirmPassword: string;
  };
  isSignup: boolean;
  submitLogin: (email: string, password: string) => Promise<void>;
  submitSignup: (pseudo: string, email: string, password: string) => Promise<void>;
  setErrorMessage: (message: string) => void;
}

export const useAuthSubmit = ({
  formData,
  isSignup,
  submitLogin,
  submitSignup,
  setErrorMessage,
}: Params) => {
  const handleSubmit = useCallback(async () => {
    const validationResult = validateAuthForm({
      email: formData.email,
      pseudo: isSignup ? formData.pseudo : undefined,
      password: formData.password,
      confirmPassword: isSignup ? formData.confirmPassword : undefined,
      isSignup,
    });

    if (Object.keys(validationResult).length > 0) {
      const messages = Object.values(validationResult).join("\n");
      setErrorMessage(messages);
      return;
    }

    try {
      setErrorMessage("");
      if (isSignup) {
        await submitSignup(formData.pseudo, formData.email, formData.password);
      } else {
        await submitLogin(formData.email, formData.password);
      }
    } catch (e) {
      console.error("Erreur lors de la soumission:", e);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }, [formData.confirmPassword, formData.email, formData.password, formData.pseudo, isSignup, setErrorMessage, submitLogin, submitSignup]);

  return { handleSubmit };
};