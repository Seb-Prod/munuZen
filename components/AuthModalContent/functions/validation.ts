export interface AuthValidationErrors {
    email?: string;
    pseudo?: string;
    password?: string;
    confirmPassword?: string;
    global?: string; // Pour les messages d'erreur généraux
}

interface AuthValidationParams {
    email: string;
    pseudo?: string; // Optionnel pour la connexion
    password: string;
    confirmPassword?: string; // Optionnel pour la connexion
    isSignup: boolean;
}

/**
 * Valide les champs d'authentification (connexion ou inscription).
 * Retourne un objet contenant les messages d'erreur par champ, ou un objet vide si valide.
 */
export const validateAuthForm = (params: AuthValidationParams): AuthValidationErrors => {
    const { email, pseudo, password, confirmPassword, isSignup } = params;
    const errors: AuthValidationErrors = {};

    // --- Validations communes ---
    if (!email) {
        errors.email = "L'email est obligatoire.";
    }
    if (!password) {
        errors.password = "Le mot de passe est obligatoire.";
    }

    // --- Validations spécifiques à l'inscription ---
    if (isSignup) {
        if (!pseudo) {
            errors.pseudo = "Le pseudo est obligatoire.";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Veuillez confirmer votre mot de passe.";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !regexEmail.test(email)) { // Vérifier l'email seulement s'il est non vide
            errors.email = "Veuillez entrer une adresse email valide.";
        }

        const passwordErrors = validatePasswordStrength(password);
        if (passwordErrors.length > 0) {
            errors.password = passwordErrors.join("\n"); // Concatène les erreurs de mot de passe
        }
    }

    return errors;
};

/**
 * Valide la force du mot de passe.
 * Retourne un tableau de chaînes de caractères contenant les messages d'erreur.
 */
const validatePasswordStrength = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("Le mot de passe doit comporter au moins 8 caractères.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Le mot de passe doit contenir au moins une majuscule.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Le mot de passe doit contenir au moins une minuscule.");
    }
    if (!/\d/.test(password)) {
        errors.push("Le mot de passe doit contenir au moins un chiffre.");
    }

    return errors;
};