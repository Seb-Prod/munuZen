export const getAuthTexts = (isSignup: boolean) => {
  return isSignup
    ? {
        title: "Créez un compte gratuitement",
        toggle: "Connectez-vous.",
        togglePrompt: "Déjà un compte ?",
        emailPlaceholder: "Email",
        button: "Créer un compte",
        loadingText:"Création du compte..."
      }
    : {
        title: "Connectez-vous à votre compte",
        toggle: "Créez-en un.",
        togglePrompt: "Pas encore de compte ?",
        emailPlaceholder: "Pseudo ou email",
        button: "Se connecter",
        loadingText:"Connexion en cours..."
      };
};