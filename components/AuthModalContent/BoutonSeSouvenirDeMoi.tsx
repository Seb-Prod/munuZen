import React from "react";
import { Switch } from "react-native";
import { styles } from "./styles";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
interface BoutonSeSouvenirDeMoiProps {
    rememberMe: boolean;
    setRememberMe: (value: boolean) => void;
}

const BoutonSeSouvenirDeMoi: React.FC<BoutonSeSouvenirDeMoiProps> = ({
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


export default BoutonSeSouvenirDeMoi;