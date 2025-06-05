import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/contexts/UserContext";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";
import { useResendActivationEmail } from "@/hooks/auth/useResendActivationEmail";
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
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

export function AuthModalContent() {
    const { setToken, setEmail, setPseudo } = useUser();

    const [formData, setFormData] = useState<AuthFormState>({
        email: "sebastien.drillaud@gmail.com",
        pseudo: "",
        password: "Menace3232",
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

    const gererMotDePasseOublie = () => {
        console.log("Mot de passe oublié pour:", formData.email,);
        // Implémenter la logique de mot de passe oublié
        Toast.show({
            type: 'info',
            text1: 'Information',
            text2: 'Fonctionnalité en cours de développement',
        });
    };

    // Soumission ok
    useHandleAuthEffect({
        data,
        isSignup,
        rememberMe,
        setToken,
        setEmail,
        setPseudo,
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



    if (showTerms) {
        return <TermsOfUse onClose={() => setShowTerms(false)} />;
    }

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

            {/* Mot de passe oublié */}
            {!isSignup && (
                <TouchableOpacity onPress={gererMotDePasseOublie}>
                    <ThemedText style={[styles.underlineText, styles.rightText]}>
                        Mot de passe oublié ?
                    </ThemedText>
                </TouchableOpacity>
            )}

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

