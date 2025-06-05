import { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Logo from "@/components/Logo";
import { CustomTextInput } from "@/components/CustomTextInput";
import { AuthFormState } from "../types/authFormsState";

type Props = {
    formData: AuthFormState;
    handleChange: (field: "email", value: string) => void;
    onClose: () => void;
};

export const ForgotPasswordForm = ({handleChange, onClose, formData }: Props) => {
    const [loading, setLoading] = useState(false);


    return (
        <View style={styles.container}>
            <Logo />
            <ThemedText variant="headline" color="vert" style={styles.centerText}>
                Mot de passe oublié
            </ThemedText>
            <ThemedText style={styles.centerText}>Entrez votre e-mail pour recevoir un lien de réinitialisation.</ThemedText>

            <CustomTextInput
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Button title={loading ? "Envoi en cours..." : "Envoyer"} onPress={onClose} disabled={loading} />
            <Button title="Annuler" onPress={onClose} color="gray" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 15,
    },
    centerText: {
        textAlign: "center",
    },
});