import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Row } from "@/components/Row";
import { BackButton } from "@/components/BackButton";
import { ThemedText } from "@/components/ThemedText";
import Logo from "@/components/Logo";
import { CustomTextInput } from "@/components/CustomTextInput";
import { Button } from "@/components/Button";

export default function Screen() {
    const colors = useThemeColors();
    const router = useRouter();
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const sendEmail = ({
        to,
        subject,
        body
    }: {
        to: string;
        subject: string;
        body: string;
    }) => {
        const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.canOpenURL(mailtoUrl)
            .then((supported) => {
                if (!supported) {
                    Alert.alert("Erreur", "Aucune application mail installée.");
                } else {
                    return Linking.openURL(mailtoUrl);
                }
            })
            .then(() => {
                // Confirmation avec option de navigation
                Alert.alert(
                    "Message envoyé", 
                    "Votre application mail s'est ouverte. Votre message est prêt à être envoyé !",
                    [
                        {
                            text: "Retour au menu",
                            onPress: () => router.push("/menu")
                        },
                        {
                            text: "Rester ici",
                            style: "cancel"
                        }
                    ]
                );
            })
            .catch((err) => console.error("Erreur ouverture email:", err));
    };

    const handleSendEmail = () => {
        if (!subject.trim()) {
            Alert.alert("Erreur", "Veuillez saisir un objet pour votre message.");
            return;
        }
        if (!body.trim()) {
            Alert.alert("Erreur", "Veuillez saisir le contenu de votre message.");
            return;
        }

        sendEmail({
            to: "menuZen.contact@gmail.com",
            subject: subject,
            body: body
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
            <SafeAreaView style={styles.content} edges={["top", "left", "right"]}>
                <Row style={styles.row}>
                    <BackButton link={"/menu"} />
                </Row>
                <Logo />
                <ThemedText variant="headline" color="vert" style={styles.title}>
                    Nous Contacter
                </ThemedText>
                
                <CustomTextInput 
                    placeholder="Objet du message"
                    value={subject}
                    onChangeText={setSubject}
                    style={styles.input}
                />
                
                <CustomTextInput 
                    placeholder="Écrivez votre message ici..."
                    value={body}
                    onChangeText={setBody}
                    multiline={true}
                    numberOfLines={6}
                    minHeight={120}
                    style={styles.messageInput}
                />

                <Button label={"Envoyer le message"} onPress={handleSendEmail}/>
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
    row: {
        justifyContent: "flex-start",
    },
    title: {
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        marginBottom: 16,
    },
    messageInput: {
        marginBottom: 24,
    },
    sendButton: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 8,
    },
    sendButtonText: {
        fontWeight: '600',
    },
});