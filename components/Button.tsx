import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Colors } from "@/constants/Colors";

type Props = {
    label: string;
    onPress: () => void;
    backgroundColor?: keyof typeof Colors["light"];
    color?: keyof typeof Colors["light"];
} & TouchableOpacityProps;

export function Button({ label, backgroundColor, color, onPress, ...rest }: Props) {
    const colors = useThemeColors();

    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={[
                styles.container,
                { backgroundColor: backgroundColor ? colors[backgroundColor] : colors.vert },
                rest.style && rest.style
            ]}

        >
            <ThemedText
                variant="subtitle1"
                color={color ?? "ivoire"}
            >{label}</ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});