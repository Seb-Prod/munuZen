import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "./ThemedText";

interface Props {
    title: string;
    children: React.ReactNode;
}

export const Section: React.FC<Props> = ({ title, children }) => {
    const colors = useThemeColors();

    return (
        <View style={styles.section}>
            <ThemedText variant="headline" color="vert" style={styles.sectionTitle}>{title}</ThemedText>
            <View style={[styles.sectionContent, { backgroundColor: colors.fondNavBar, shadowColor: colors.ombre }]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        marginLeft:5,
        marginBottom: 5,
    },
    sectionContent: {
        borderRadius: 10,
        paddingVertical: 10,

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Ombre Android
        elevation: 3,
    },
});