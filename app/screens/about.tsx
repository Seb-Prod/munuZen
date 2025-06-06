import { StyleSheet, ScrollView, View, TouchableOpacity, Linking } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/Logo";
import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "@/components/BackButton";
import { Row } from "@/components/Row";

export default function AboutScreen() {
    const colors = useThemeColors();

    return (
        
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.ivoire }]} edges={["top", "left", "right"]}>
            <Row style={styles.row}><BackButton link={"/menu"} /></Row>
            <View style={styles.container}>
                {/* Contenu scrollable */}
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Logo />
                    <ThemedText variant="headline" color="vert" style={styles.title}>
                        À propos de MenuZen
                    </ThemedText>

                    <ThemedText style={styles.paragraph}>
                        {"MenuZen est une application mobile pensée pour simplifier la vie quotidienne en vous aidant à planifier vos repas de la semaine."}
                    </ThemedText>

                    <ThemedText style={styles.paragraph}>
                        {"Grâce à MenuZen, vous pouvez organiser vos menus hebdomadaires, créer automatiquement votre liste de courses, et ajouter vos propres recettes pour gagner du temps et mieux manger."}
                    </ThemedText>

                    <ThemedText style={styles.paragraph}>
                        {"L'application a été entièrement développée en React Native, accompagnée d'une API REST en PHP pour gérer les données de manière efficace."}
                    </ThemedText>

                    <ThemedText style={styles.paragraph}>
                        {"Ce projet est réalisé en solo par Seb-Prod, passionné de tech et de cuisine. MenuZen est né de la volonté de rendre la planification des repas plus zen, plus rapide et plus agréable."}
                    </ThemedText>
                </ScrollView>

                {/* Footer fixe avec les liens */}
                <View style={[styles.linksContainer, { borderTopColor: colors.separateur, borderTopWidth: 1 }]}>
                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => Linking.openURL("https://github.com/Seb-Prod")}
                    >
                        <Ionicons name="logo-github" size={24} color={colors.texte} />
                        <ThemedText style={styles.linkText}>GitHub</ThemedText>
                    </TouchableOpacity>

                    <Logo img="sebProd" />

                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => Linking.openURL("https://www.linkedin.com/in/sébastien-drillaud-b68b3318a/")}
                    >
                        <Ionicons name="logo-linkedin" size={24} color={colors.texte} />
                        <ThemedText style={styles.linkText}>LinkedIn</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding:10,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40, // pour ne pas coller au footer
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center",
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
    },
    linksContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom:10
    },
    link: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    linkText: {
        fontSize: 16,
    },
    row: {
        justifyContent: "flex-start",
    },
});