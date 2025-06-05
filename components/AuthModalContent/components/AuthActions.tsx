import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import RememberMeToggle from "./RememberMeToggle";
import ResendActivationEmailButton from "./ResendActivationEmailButton";

interface Props {
  isSignup: boolean;
  texts: {
    button: string;
  };
  handleSubmit: () => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  showTerms: boolean;
  setShowTerms: (value: boolean) => void;
  showResendEmailButton: boolean;
  resendActivationEmail: () => void;
}

export const AuthActions: React.FC<Props> = ({
  isSignup,
  texts,
  handleSubmit,
  rememberMe,
  setRememberMe,
  showTerms,
  setShowTerms,
  showResendEmailButton,
  resendActivationEmail,
}) => {
  return (
    <View>
      <Button
        label={texts.button}
        onPress={handleSubmit}
        style={styles.buttonSmall}
      />

      {!isSignup && (
        <RememberMeToggle
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      )}

      {isSignup && (
        <TouchableOpacity onPress={() => setShowTerms(true)}>
          <ThemedText style={styles.underlineText}>
            En créant un compte j&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
          </ThemedText>
        </TouchableOpacity>
      )}

      {showResendEmailButton && (
        <ResendActivationEmailButton
          resendActivationEmail={resendActivationEmail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    buttonSmall: {
        alignSelf: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 10,
    },
    underlineText: {
        paddingTop:5,
        alignSelf:"center",
        textAlign:"center",
        textDecorationLine: "underline",
        marginLeft: 5,
    },
});