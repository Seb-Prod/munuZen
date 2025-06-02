import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { ThemedText } from "./ThemedText"

type Props = {
    iconName: keyof typeof Ionicons.glyphMap,
    link: string,
    label: string,
    active: boolean
}

export function ButtonIcon({ iconName, link, label, active }: Props) {
    const handlePress = () => {
        if (!active) {
            router.push({ pathname: link as any })
        }
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={`Naviguer vers ${link}`}
            style={[styles.button, active && styles.activeItem]}
        >
            <View style={styles.iconTextWrapper}>
                <Ionicons
                    name={iconName}
                    size={26}
                    color={active ? 'black' : 'black'}
                />
                <ThemedText variant="caption" style={[styles.label]}>{label}</ThemedText>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    activeItem: {
        backgroundColor: '#1E4D2B',
    },
    iconTextWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
    },
    label: {
        marginTop: 4,
        fontSize: 8,
        textAlign: 'center',
        color: 'black',
        lineHeight: 14,
        flexShrink: 1,
    },
})