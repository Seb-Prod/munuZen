import { useCallback } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

/**
 * Hook qui permet de rafraîchir le token d'accès à l'aide du refresh token.
 *
 * Vérifie si le refresh token est encore valide, puis effectue une requête via
 * la fonction `submit` pour obtenir un nouveau token d'accès.
 * En cas d'échec, réinitialise les données utilisateur et notifie l'utilisateur.
 *
 * @param refreshToken - Le refresh token actuel (ou null s'il n'existe pas).
 * @param refreshTokenExpiresAt - Timestamp (ms) d’expiration du refresh token.
 * @param resetUser - Fonction pour réinitialiser toutes les données utilisateur (ex: à la déconnexion).
 * @param submit - Fonction à appeler pour rafraîchir le token. Prend en paramètre :
 *        - le refreshToken
 *        - un callback de succès (reçoit les nouveaux tokens)
 *        - un callback d’échec (reçoit un message d’erreur)
 * @param setToken - Fonction pour mettre à jour le token d’accès.
 * @param setTokenExpiresAt - Fonction pour mettre à jour l’expiration du token.
 * @param setRefreshToken - Fonction pour mettre à jour le refresh token.
 * @param setRefreshTokenExpiresAt - Fonction pour mettre à jour l’expiration du refresh token.
 *
 * @returns Une fonction `async () => boolean` qui tente de rafraîchir le token et retourne `true` en cas de succès.
 */
export const useRefreshAccessToken = (
  refreshToken: string | null,
  refreshTokenExpiresAt: number | null,
  resetUser: () => Promise<void>,
  submit: (
    token: string,
    onSuccess: (data: any) => void,
    onError: (message: string) => void
  ) => Promise<void>,
  setToken: (token: string | null) => void,
  setTokenExpiresAt: (expiresAt: number | null) => void,
  setRefreshToken: (token: string | null) => void,
  setRefreshTokenExpiresAt: (expiresAt: number | null) => void
) => {
  return useCallback(async (): Promise<boolean> => {
    // --- Vérifie qu'on a bien un refresh token disponible ---
    if (!refreshToken) {
      //console.warn("useRefreshAccessToken.ts" ,"Pas de refresh token disponible.");
      return false;
    }

    const now = Date.now();

    // --- Vérifie si le refresh token a expiré ---
    if (refreshTokenExpiresAt && now >= refreshTokenExpiresAt) {
      //console.warn("useRefreshAccessToken.ts" ,"Le refresh token a expiré. Déconnexion.");
      await resetUser();
      Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.");
      return false;
    }

    try {
      let success = false;

      // --- Tente de rafraîchir le token en appelant `submit` ---
      await submit(
        refreshToken,
        (newData) => {
          // --- Callback succès ---
          setToken(newData.token);
          setTokenExpiresAt(newData.token_expires_at ? parseInt(newData.token_expires_at, 10) * 1000 : null);

          if (newData.refresh_token) {
            setRefreshToken(newData.refresh_token);
            setRefreshTokenExpiresAt(
              newData.refresh_token_expires_at ? parseInt(newData.refresh_token_expires_at, 10) * 1000 : null
            );
          }

          //console.log("useRefreshAccessToken.ts" ,"Token rafraîchi via callback.");
          // Toast.show({
          //   type: "success",
          //   text1: "Session mise à jour",
          //   text2: "Votre session a été prolongée.",
          // });

          success = true;
        },
        (message) => {
          // --- Callback erreur ---
          //console.warn("useRefreshAccessToken.ts" ,"Rafraîchissement échoué :", message);
          Toast.show({
            type: "error",
            text1: "Erreur de session",
            text2: message,
          });
        }
      );

      // --- En cas d'échec, on réinitialise l'utilisateur ---
      if (!success) {
        await resetUser();
        Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.");
      }

      return success;
    } catch (error) {
      console.error("useRefreshAccessToken.ts" ,"Erreur pendant le refresh via hook :", error);
      Toast.show({
        type: "error",
        text1: "Problème de session",
        text2: "Impossible de rafraîchir la session.",
      });
      return false;
    }
  }, [
    refreshToken,
    refreshTokenExpiresAt,
    resetUser,
    submit,
    setToken,
    setTokenExpiresAt,
    setRefreshToken,
    setRefreshTokenExpiresAt,
  ]);
};