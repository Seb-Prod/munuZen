import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";

type Props = {
  email: string;
  onClose: () => void;
};

const emailVerificationData = [
  {
    id: "header",
    type: "header",
    content: "Activation du compte",
  },
  {
    id: "intro",
    type: "text",
    content:
      "Un e-mail de confirmation vient de vous être envoyé à l'adresse indiquée ci-dessous. " +
      "Merci de cliquer sur le lien contenu dans ce message pour activer votre compte.",
  },
  {
    id: "email",
    type: "text",
    content: "", // sera remplacé dynamiquement
  },
  {
    id: "info",
    type: "text",
    content:
      "Pensez à vérifier vos courriers indésirables (spams) si vous ne voyez rien dans votre boîte de réception.",
  },
];

export function EmailVerificationModal({ email, onClose }: Props) {
  // on injecte l'email dans le contenu
  const contentWithEmail = emailVerificationData.map(item =>
    item.id === "email"
      ? { ...item, content: email }
      : item
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      {contentWithEmail.map((item) => {
        switch (item.type) {
          case "header":
            return (
              <ThemedText
                key={item.id}
                variant="headline"
                color="vert"
                style={styles.centerText}
              >
                {item.content}
              </ThemedText>
            );
          case "text":
            return (
              <ThemedText
                key={item.id}
                style={item.id === "email" ? styles.emailText : styles.sectionText}
              >
                {item.content}
              </ThemedText>
            );
          default:
            return null;
        }
      })}

      <View style={styles.buttonContainer}>
        <Button label="Fermer" onPress={onClose} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  centerText: {
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  sectionText: {
    lineHeight: 20,
    marginBottom: 12,
    fontSize: 14,
  },
  emailText: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1D4ED8",
    textAlign: "center",
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    alignSelf: "stretch",
  },
});