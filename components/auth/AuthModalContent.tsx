import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import Logo from "../Logo";
import { Row } from "../Row";
import { CustomTextInput } from "../CustomTextInput";
import { TermsOfUse } from "./TermsOfUse";
import { useLogin } from "@/hooks/user/useLogin";
import Toast from "react-native-toast-message";
import { LoadingOverlay } from "../LoadingOverlay";

export function AuthModalContent() {
    const colors = useThemeColors();
    const { submit, loading, data, error } = useLogin();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const toggleAuthMode = () => setIsSignup((prev) => !prev);

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

    const handleSubmit = async () => {
        if (!email || !password || (isSignup && !pseudo)) {
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
        }

        try {
            if (isSignup) {
                console.log("Je crée un compte");
            } else {
                console.log("je me connecte")
                await submit("sebastien.drillaud@gmail.co", "Menace32");
                if (rememberMe) {
                    console.log("Mémorisation des identifiants");
                    // Stockage en AsyncStorage possible ici
                }

            }
            setErrorMessage("");
            // Fermer modal ou rediriger ici
        } catch {
            setErrorMessage("Une erreur s'est produite.");
        }
    };

    useEffect(() => {
        if (data) {
            Toast.show({
                type: 'success',
                text1: 'Succès',
                text2: 'Connexion réussie !',
            });
        }
    }, [data]);

    useEffect(() => {
        if (error) setErrorMessage(error);
    }, [error]);

    if (showTerms) {
        return <TermsOfUse onClose={() => setShowTerms(false)} />;
    }

    const InfoSwitch = () => (
        <Row style={styles.rememberMeRow}>
            <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: "#ccc", true: colors.vert }}
                thumbColor={rememberMe ? "#fff" : "#f4f3f4"}
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
                    value={pseudo}
                    onChangeText={setPseudo}
                    autoCapitalize="none"
                />
            )}

            <CustomTextInput
                placeholder={texts.emailPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType={isSignup ? "email-address" : "default"}
                autoCapitalize="none"
            />

            <CustomTextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {!isSignup && (
                <TouchableOpacity onPress={() => console.log("Mot de passe oublié")}>
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

            {!isSignup && <InfoSwitch />}

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

const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 10,
    },
    centerText: {
        textAlign: "center",
    },
    centerTextRow: {
        justifyContent: "center",
    },
    underlineText: {
        textDecorationLine: "underline",
        marginLeft: 5,
    },
    rightText: {
        textAlign: "right",
    },
    button: {
        alignSelf: "stretch",
    },
    error: {
        marginTop: 10,
        textAlign: "center",
        color: "red",
        fontWeight: "500",
    },
    rememberMeRow: {
        alignItems: "center",
        marginVertical: 10,
    },
    rememberMeText: {
        marginLeft: 8,
    },
    termsContainer: {
        flex: 1,
        marginVertical: 10,
    },
});