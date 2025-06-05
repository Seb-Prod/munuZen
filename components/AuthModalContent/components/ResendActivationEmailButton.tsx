import { Button } from "../../Button";
import { StyleSheet } from "react-native";

interface Props {
    resendActivationEmail: () => void;
}

const ResendActivationEmailButton: React.FC<Props> = ({ resendActivationEmail }) => {
    return (
        <Button
            label="Renvoyer l'email d'activation"
            backgroundColor="jaune"
            color="ombre"
            onPress={() => resendActivationEmail()}
            style={styles.buttonSmall}
        />
    )
}

export const styles = StyleSheet.create({
    buttonSmall: {
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
});

export default ResendActivationEmailButton;