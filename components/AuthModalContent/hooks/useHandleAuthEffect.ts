import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { ROUTES } from "@/constants/Routes";

interface Params {
  data: any;
  isSignup: boolean;
  rememberMe: boolean;
  setToken: (token: string) => void;
  setEmail: (email: string) => void;
  setPseudo: (pseudo: string) => void;
  resetLogin: () => void;
  resetSignup: () => void;
  setIsSignup: (value: boolean) => void;
  setShowEmailModal: (value: boolean) => void;
}

export const useHandleAuthEffect = ({
  data,
  isSignup,
  rememberMe,
  setToken,
  setEmail,
  setPseudo,
  resetLogin,
  resetSignup,
  setIsSignup,
  setShowEmailModal,
}: Params) => {
  useEffect(() => {
    if (data) {
      const handleAuth = async () => {
        const message = isSignup ? "Compte créé avec succès !" : "Connexion réussie !";

        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });

        if (!isSignup && data?.token && data?.email && data?.username) {
          setToken(data.token);
          setEmail(data.email);
          setPseudo(data.username);

          if (rememberMe) {
            await AsyncStorage.multiSet([
              ["userToken", data.token],
              ["userEmail", data.email],
              ["userPseudo", data.username],
              ["rememberMe", "true"],
            ]);
          } else {
            await AsyncStorage.multiRemove(["userToken", "userEmail", "userPseudo", "rememberMe"]);
          }
        }

        if (!isSignup) {
          resetLogin();
          setTimeout(() => {
            router.replace(ROUTES.PLANNING);
          }, 500);
        } else {
          resetSignup();
          setIsSignup(false);
          setShowEmailModal(true);
        }
      };

      handleAuth();
    }
  }, [data, isSignup, rememberMe, resetLogin, resetSignup, setEmail, setIsSignup, setPseudo, setShowEmailModal, setToken]);
};