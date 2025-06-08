import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";
import { useResendActivationEmail } from "@/hooks/auth/useResendActivationEmail";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { LoadingOverlay } from "../LoadingOverlay";
import Logo from "../Logo";
import { getAuthTexts } from "./functions/authTexts";
import { EmailVerificationModal } from "./components/EmailVerificationModal";
import { TermsOfUse } from "./components/TermsOfUse";
import { AuthActions } from "./components/AuthActions";
import { AuthFormFields } from "./components/AuthFormFields";
import { useHandleAuthEffect } from "./hooks/useHandleAuthEffect";
import { useHandleAuthErrors } from "./hooks/useHandleAuthErrors";
import { useAuthSubmit } from "./hooks/useAuthSubmit";
import { useResendActivationHandler } from "./hooks/useResendActivationHandler";
import { ToggleAuthMode } from "./components/ToggleAuthmode";
import { AuthFormState } from "./types/authFormsState";
import ForgotPasswordButton from "./components/ForgotPasswordButton";
import { router } from "expo-router";
import { ROUTES } from "@/constants/Routes";

export function AuthModalContent() {
    const { setToken, setEmail, setPseudo, setRole } = useUser();

    const [formData, setFormData] = useState<AuthFormState>({
        email: "",
        pseudo: "",
        password: "",
        confirmPassword: "",
    });

    const { submit: submitLogin, loading: loginLoading, data: loginData, error: loginError, reset: resetLogin } = useLogin();
    const { submit: submitSignup, loading: signupLoading, data: signupData, error: signupError, reset: resetSignup } = useRegister();
    const { submit: submitResendActivationEmail, loading: resendActivationEmailLoading, error: resendActivationEmailError } = useResendActivationEmail();

    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    
    const [showTerms, setShowTerms] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showResendEmailButton, setShowResendEmailButton] = useState(false);

    const loading = loginLoading || signupLoading || resendActivationEmailLoading;
    const data = loginData || signupData;
    const error = loginError || signupError || resendActivationEmailError;

    const texts = getAuthTexts(isSignup);

    const handleChange = (field: keyof AuthFormState, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    // Changement de mode (login / registration)
    const toggleAuthMode = () => {
        setIsSignup((prev) => !prev);
        setErrorMessage("");
        setFormData({
            email: "",
            pseudo: "",
            password: "",
            confirmPassword: "",
        });
    };

    // Action soumission du formulaire
    const { handleSubmit } = useAuthSubmit({
        formData,
        isSignup,
        submitLogin,
        submitSignup,
        setErrorMessage
    });

    // Action renvoie du mail de validation du compte
    const { resendActivationEmail } = useResendActivationHandler({
        email: formData.email,
        submitResendActivationEmail,
        setShowEmailModal,
        setErrorMessage
    });

    // Soumission ok
    useHandleAuthEffect({
        data,
        isSignup,
        rememberMe,
        setToken,
        setEmail,
        setPseudo,
        setRole,
        resetLogin,
        resetSignup,
        setIsSignup,
        setShowEmailModal
    });

    // Soumission erreur
    useHandleAuthErrors({
        error,
        setErrorMessage,
        setShowResendEmailButton
    });

    // Affichage des conditions d'utilisation
    if (showTerms) {
        return <TermsOfUse onClose={() => setShowTerms(false)} />;
    }

    // Affichage de l'envoie du mail
    if (showEmailModal) {
        return <EmailVerificationModal email={formData.email} onClose={() => setShowEmailModal(false)} />;
    }

    return (
        <View style={styles.container}>
            <Logo />
            <ThemedText variant="headline" color="vert" style={styles.centerText}>
                {texts.title}
            </ThemedText>

            {/* Bascule du mode login à register */}
            <ToggleAuthMode
                toggleAuthMode={toggleAuthMode}
                togglePrompt={texts.togglePrompt}
                toggleText={texts.toggle}
            />

            {/* Affiche les champs du formulaire */}
            <AuthFormFields
                formData={formData}
                isSignup={isSignup}
                texts={texts}
                handleChange={handleChange} />

            {/* Affiche le bouton mot de passe oublié */}
            <ForgotPasswordButton isSignup={isSignup} onPress={() => router.replace(ROUTES.FORGOTPASSWORD)} />

            {/* Affiche les actions associées à l'authentification */}
            <AuthActions
                isSignup={isSignup}
                texts={texts}
                handleSubmit={handleSubmit}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                showTerms={showTerms}
                setShowTerms={setShowTerms}
                showResendEmailButton={showResendEmailButton}
                resendActivationEmail={resendActivationEmail}
            />

            {/* Affiche les erreurs éventuelles */}
            {!!errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}

            {/* Affiche un modal pendent l'éxécution */}
            <LoadingOverlay visible={loading} text={texts.loadingText} />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 10,
        alignSelf: "stretch",
    },
    centerText: {
        textAlign: "center",
    },
    error: {
        marginTop: 10,
        textAlign: "center",
        color: "red",
        fontWeight: "500",
    },
    
});

