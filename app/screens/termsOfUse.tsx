import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Row } from "@/components/Row";
import { BackButton } from "@/components/BackButton";
import { TermsOfUse } from "@/components/AuthModalContent/components/TermsOfUse";
import Logo from "@/components/Logo";

export default function Screen() {
    const colors = useThemeColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
            {/* Zone protégée (top, notch, etc.) */}
            <SafeAreaView style={styles.content} edges={["top", "left", "right"]}>
                <Row style={styles.row}><BackButton link={"/menu"} /></Row> 
                <Logo/>
                <TermsOfUse/>  
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
});