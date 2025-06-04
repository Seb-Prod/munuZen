import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 10,
        alignSelf: "stretch",
    },
    centerText: {
        textAlign: "center",
    },
    centerTextRow: {
        justifyContent: "center",
    },
    underlineText: {
        textDecorationLine: "underline",
        marginLeft: 5,
    },
    rightText: {
        textAlign: "right",
    },
    buttonSmall: {
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
    error: {
        marginTop: 10,
        textAlign: "center",
        color: "red",
        fontWeight: "500",
    },
    rememberMeRow: {
        alignItems: "center",
        marginVertical: 10,
    },
    rememberMeText: {
        marginLeft: 8,
    },
    termsContainer: {
        flex: 1,
        marginVertical: 10,
    },
});