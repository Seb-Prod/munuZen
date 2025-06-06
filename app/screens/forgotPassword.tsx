import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Logo from "@/components/Logo";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Row } from "@/components/Row";
import { BackButton } from "@/components/BackButton";
import { CustomTextInput } from "@/components/CustomTextInput";
import { Button } from "@/components/Button";
import Toast from "react-native-toast-message";

export default function Screen() {
    const colors = useThemeColors();
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
    Toast.show({
              type: "info",
              text1: "Succès",
              text2: "Fonctionnalité a faire",
            });
  };

    return (
        <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
            {/* Zone protégée (top, notch, etc.) */}
            <SafeAreaView style={styles.content} edges={["top", "left", "right"]}>
                <Row style={styles.row}><BackButton link={"/menu"} /></Row>
                <Logo />
                <ThemedText variant="headline" color="vert" style={styles.centerText}>
                    Mot de passe oublié
                </ThemedText>

                <CustomTextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <ThemedText style={styles.textInfo}>
                    {`Après avoir renseigné l'email de votre compte, vous recevrez un message permettant de réinitialiser votre mot de passe.`}
                </ThemedText>
                <Button
                        label="Réinitialiser mon mot de passe"
                        onPress={handleSubmit}
                        style={styles.buttonSmall}
                      />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    centerText: {
        marginTop:20,
        marginBottom:20,
        textAlign: "center",
    },
    textInput: {
        margin:20
    },
    textInfo: {
        textAlign: "center",
        padding: 20,
    },
    row: {
        justifyContent: "flex-start",
    },
    buttonSmall: {
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
});