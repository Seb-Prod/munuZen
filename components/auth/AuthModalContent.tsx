import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import Logo from "../Logo";
import { Row } from "../Row";
import { CustomTextInput } from "../CustomTextInput";
import { TermsOfUse } from "./TermsOfUse";
import { useLogin } from "@/hooks/user/useLogin";
import Toast from "react-native-toast-message";

export function AuthModalContent() {
    const colors = useThemeColors();
    const { submit, loading, data, error } = useLogin();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("a");
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("a");
    const [errorMessage, setErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const toggleAuthMode = () => setIsSignup((prev) => !prev);

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
                await submit("sebastien.drillaud@gmail.com", "Menace32");
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
        console.log(data?.email)
        Toast.show({
            type: 'success',
            text1: 'Succès',
            text2: 'Opération réussie !'
        });

    }, [data]);

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
                {isSignup ? "Créez un compte gratuitement" : "Connectez-vous à votre compte"}
            </ThemedText>

            <Row style={styles.centerTextRow}>
                <ThemedText>{isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}</ThemedText>
                <TouchableOpacity onPress={toggleAuthMode}>
                    <ThemedText style={styles.underlineText}>
                        {isSignup ? "Connectez-vous." : "Créez-en un."}
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
                placeholder={isSignup ? "Email" : "Pseudo ou email"}
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
                label={isSignup ? "Créer un compte" : "Se connecter"}
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