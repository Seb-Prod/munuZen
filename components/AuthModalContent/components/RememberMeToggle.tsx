import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { Switch, StyleSheet } from "react-native";
import { Row } from "../../Row";
import { ThemedText } from "../../ThemedText";

interface Props {
    rememberMe: boolean;
    setRememberMe: (value: boolean) => void;
}

const RememberMeToggle: React.FC<Props> = ({
    rememberMe,
    setRememberMe,
}) => {
    const colors = useThemeColors();
    return (
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
};

export const styles = StyleSheet.create({
    buttonSmall: {
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
    rememberMeRow: {
        alignItems: "center",
        marginVertical: 10,
    },
    rememberMeText: {
        marginLeft: 8,
    },
});

export default RememberMeToggle;