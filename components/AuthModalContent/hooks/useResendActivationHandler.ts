import { useCallback } from "react";

interface Params {
  email: string;
  submitResendActivationEmail: (email: string) => Promise<void>;
  setShowEmailModal: (show: boolean) => void;
  setErrorMessage: (message: string) => void;
}

export const useResendActivationHandler = ({
  email,
  submitResendActivationEmail,
  setShowEmailModal,
  setErrorMessage,
}: Params) => {
  const resendActivationEmail = useCallback(async () => {
    setErrorMessage("");
    try {
      await submitResendActivationEmail(email);
      setShowEmailModal(true);
    } catch (e) {
      console.error("Erreur lors de la soumission:", e);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }, [email, setErrorMessage, setShowEmailModal, submitResendActivationEmail]);

  return { resendActivationEmail };
};