import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import Logo from "../Logo";
import { Row } from "../Row";
import { CustomTextInput } from "../CustomTextInput";
import { useLogin } from "@/hooks/auth/useLogin";
import Toast from "react-native-toast-message";
import { LoadingOverlay } from "../LoadingOverlay";
import { validateAuthForm } from "@/components/AuthModalContent/validation";
import { TermsOfUse } from "./TermsOfUse";
import { styles } from "./styles";
import { ROUTES } from "@/constants/Routes";
import { router } from "expo-router";
import { useRegister } from "@/hooks/auth/useRegister";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { useResendActivationEmail } from "@/hooks/auth/useResendActivationEmail";
import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BoutonSeSouvenirDeMoi from "./BoutonSeSouvenirDeMoi";

interface AuthFormState {
    email: string;
    pseudo: string;
    password: string;
    confirmPassword: string;
}


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
            email: "sebastien.drillaud@gmail.com",
            pseudo: "seb",
            password: "Menace3232",
            confirmPassword: "Menace3232",
        });
    };

    // Textes 
    const texts = isSignup
        ? {
            title: "Créez un compte gratuitement",
            toggle: "Connectez-vous.",
            togglePrompt: "Déjà un compte ?",
            emailPlaceholder: "Email",
            button: "Créer un compte",
        }
        : {
            title: "Connectez-vous à votre compte",
            toggle: "Créez-en un.",
            togglePrompt: "Pas encore de compte ?",
            emailPlaceholder: "Pseudo ou email",
            button: "Se connecter",
        };

    const validerFormulaire = () => {
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
            return false;
        }

        setErrorMessage("");
        return true;
    };

    const handleSubmit = async () => {
        if (!validerFormulaire()) {
            return;
        }

        try {
            setErrorMessage("");

            if (isSignup) {
                await submitSignup(formData.pseudo, formData.email, formData.password);
            } else {
                await submitLogin(formData.email, formData.password);
                if (rememberMe) {
                    console.log("Mémorisation des identifiants");
                }
            }
        } catch (e) {
            console.error("Erreur lors de la soumission:", e);
            setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    const resendActivationEmail = async () => {
        setErrorMessage("");
        try {
            await submitResendActivationEmail(formData.email);
            setShowEmailModal(true);
        } catch (e) {
            console.error("Erreur lors de la soumission:", e);
            setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
    }

    const gererMotDePasseOublie = () => {
        console.log("Mot de passe oublié pour:", formData.email,);
        // Implémenter la logique de mot de passe oublié
        Toast.show({
            type: 'info',
            text1: 'Information',
            text2: 'Fonctionnalité en cours de développement',
        });
    };

    useEffect(() => {
        if (data) {
            const handleAuth = async () => {
                const message = isSignup ? 'Compte créé avec succès !' : 'Connexion réussie !';

                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: message,
                });

                if (!isSignup && data?.token && data?.email && data?.username) {
                    setToken(data.token);
                    setEmail(data.email);
                    setPseudo(data.username);

                    if (rememberMe) {
                        await AsyncStorage.multiSet([
                            ["userToken", data.token],
                            ["userEmail", data.email],
                            ["userPseudo", data.username],
                            ["rememberMe", "true"]
                        ]);
                    } else {
                        await AsyncStorage.multiRemove([
                            "userToken",
                            "userEmail",
                            "userPseudo",
                            "rememberMe"
                        ]);
                    }
                }

                if (!isSignup) {
                    resetLogin();
                    setTimeout(() => {
                        router.replace(ROUTES.PLANNING);
                    }, 500);
                } else {
                    resetSignup();
                    setIsSignup(false);
                    setShowEmailModal(true);
                }
            };

            handleAuth();
        }
    }, [data, isSignup, resetLogin, resetSignup, rememberMe, setEmail, setPseudo, setToken]);

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
    }, [error]);




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

            <Row style={styles.centerTextRow}>
                <ThemedText>{texts.togglePrompt}</ThemedText>
                <TouchableOpacity onPress={toggleAuthMode}>
                    <ThemedText style={styles.underlineText}>
                        {texts.toggle}
                    </ThemedText>
                </TouchableOpacity>
            </Row>

            {isSignup && (
                <CustomTextInput
                    placeholder="Pseudo"
                    value={formData.pseudo}
                    onChangeText={(text) => handleChange("pseudo", text)}
                    autoCapitalize="none"
                />
            )}

            <CustomTextInput
                placeholder={texts.emailPlaceholder}
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType={isSignup ? "email-address" : "default"}
                autoCapitalize="none"
            />

            <CustomTextInput
                placeholder="Mot de passe"
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
            />

            {isSignup && (
                <CustomTextInput
                    placeholder="Comfirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange("confirmPassword", text)}
                    secureTextEntry
                />
            )}

            {!isSignup && (
                <TouchableOpacity onPress={gererMotDePasseOublie}>
                    <ThemedText style={[styles.underlineText, styles.rightText]}>
                        Mot de passe oublié ?
                    </ThemedText>
                </TouchableOpacity>
            )}

            <Button
                label={texts.button}
                onPress={handleSubmit}
                style={styles.buttonSmall}
            />

            {!isSignup && <BoutonSeSouvenirDeMoi rememberMe={rememberMe} setRememberMe={setRememberMe} />}

            {isSignup && (
                <TouchableOpacity onPress={() => setShowTerms(true)}>
                    <ThemedText style={[styles.underlineText, styles.centerText]}>
                        En créant un compte j&apos;accepte les conditions d&apos;utilisation
                    </ThemedText>
                </TouchableOpacity>
            )}

            {!!errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}

            {showResendEmailButton && (
                <Button
                    label="Renvoyer l'email d'activation"
                    backgroundColor="jaune"
                    color="ombre"
                    onPress={() => resendActivationEmail()}
                    style={styles.buttonSmall}
                />
            )}


            <LoadingOverlay visible={loading} text="Connexion en cours..." />
        </View>
    );
}

