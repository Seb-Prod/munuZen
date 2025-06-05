import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Row } from "@/components/Row"; // ou "../Row" selon l'arborescence

interface Props {
  toggleAuthMode: () => void;
  togglePrompt: string;
  toggleText: string;
}

export const ToggleAuthMode = ({ toggleAuthMode, togglePrompt, toggleText }: Props) => {
  return (
    <Row style={styles.centerTextRow}>
      <ThemedText>{togglePrompt}</ThemedText>
      <TouchableOpacity onPress={toggleAuthMode}>
        <ThemedText style={styles.underlineText}>{toggleText}</ThemedText>
      </TouchableOpacity>
    </Row>
  );
};


export const styles = StyleSheet.create({
    centerTextRow: {
        justifyContent: "center",
    },
    underlineText: {
        textDecorationLine: "underline",
        marginLeft: 5,
    },
});