import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity, StyleSheet } from "react-native";

interface Props {
    isSignup: boolean;
    onPress: () => void;
}

const ForgotPasswordButton: React.FC<Props> = ({ isSignup, onPress }) => {
    if (isSignup) return null;
    
    return (
        <TouchableOpacity onPress={onPress}>
            <ThemedText style={[styles.underlineText, styles.rightText]}>
                Mot de passe oublié ?
            </ThemedText>
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    underlineText: {
        paddingTop: 5,
        alignSelf: "center",
        textAlign: "center",
        textDecorationLine: "underline",
        marginLeft: 5,
    },
    rightText: {
        textAlign: "right",
    },
});

export default ForgotPasswordButton;

