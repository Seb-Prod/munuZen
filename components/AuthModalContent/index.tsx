import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
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

interface AuthFormState {
    email: string;
    pseudo: string;
    password: string;
    confirmPassword: string;
}


export function AuthModalContent() {
    const colors = useThemeColors();

    const [formData, setFormData] = useState<AuthFormState>({
        email: "",
        pseudo: "",
        password: "",
        confirmPassword: "",
    });

    const { submit: submitLogin, loading: loginLoading, data: loginData, error: loginError } = useLogin();

    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const loading = loginLoading //|| signupLoading;
    const data = loginData //|| signupData;
    const error = loginError //|| signupError;

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
                console.log("Création de compte pour:", formData.email);
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
            const message = isSignup ? 'Compte créé avec succès !' : 'Connexion réussie !';
            Toast.show({
                type: 'success',
                text1: 'Succès',
                text2: message,
            });

            setTimeout(() => {
                router.replace(ROUTES.PLANNING); // ou ROUTES.MENU selon ton cas
                //onSuccess?.(); // fermeture du modal si géré à l'extérieur
            }, 500); // léger délai pour éviter le conflit avec la fermeture du modal
        }
    }, [data, isSignup]);

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
        }
    }, [error]);

    if (showTerms) {
        return <TermsOfUse onClose={() => setShowTerms(false)} />;
    }

    const BoutonSeSouvenirDeMoi = () => (
        <Row style={styles.rememberMeRow}>
            <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: "#ccc", true: colors.vert }}
                thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
                accessibilityLabel="Se souvenir de moi"
            />
            <ThemedText style={styles.rememberMeText}>Se souvenir de moi</ThemedText>
        </Row>
    );

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
                style={styles.button}
            />

            {!isSignup && <BoutonSeSouvenirDeMoi />}

            {isSignup && (
                <TouchableOpacity onPress={() => setShowTerms(true)}>
                    <ThemedText style={[styles.underlineText, styles.centerText]}>
                        En créant un compte j&apos;accepte les conditions d&apos;utilisation
                    </ThemedText>
                </TouchableOpacity>
            )}

            {!!errorMessage && <ThemedText style={styles.error}>{errorMessage}</ThemedText>}
            <LoadingOverlay visible={loading} text="Connexion en cours..." />
        </View>
    );
}

