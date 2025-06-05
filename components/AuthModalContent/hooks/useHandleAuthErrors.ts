import { useEffect } from "react";

interface Params {
  error: string | null;
  setErrorMessage: (value: string) => void;
  setShowResendEmailButton: (value: boolean) => void;
}

export const useHandleAuthErrors = ({
  error,
  setErrorMessage,
  setShowResendEmailButton,
}: Params) => {
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }

    const needActivationMessage = "Votre compte n'est pas encore activé.";

    if (error === needActivationMessage) {
      setShowResendEmailButton(true);
    } else {
      setShowResendEmailButton(false);
    }
  }, [error, setErrorMessage, setShowResendEmailButton]);
};