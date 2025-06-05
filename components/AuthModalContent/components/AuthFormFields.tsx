import React from "react";
import { CustomTextInput } from "@/components/CustomTextInput";
import { AuthFormState } from "../types/authFormsState";

interface Props {
  formData: AuthFormState;
  isSignup: boolean;
  texts: {
    emailPlaceholder: string;
  };
  handleChange: (field: keyof AuthFormState, value: string) => void;
}

export const AuthFormFields: React.FC<Props> = ({
  formData,
  isSignup,
  texts,
  handleChange,
}) => {
  return (
    <>
      {isSignup && (
        <CustomTextInput
          placeholder="Pseudo"
          value={formData.pseudo}
          onChangeText={(text) => handleChange("pseudo", text)}
          autoCapitalize="none"
        />
      )}

      <CustomTextInput
        placeholder={texts.emailPlaceholder}
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType={isSignup ? "email-address" : "default"}
        autoCapitalize="none"
      />

      <CustomTextInput
        placeholder="Mot de passe"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      {isSignup && (
        <CustomTextInput
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
        />
      )}
    </>
  );
};