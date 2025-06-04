import React from "react";
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
}

export function LoadingOverlay({ visible, text = "Chargement en cours..." }: LoadingOverlayProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});