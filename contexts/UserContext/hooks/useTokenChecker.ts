import { useEffect } from "react";

/**
 * Hook personnalisé qui vérifie régulièrement si le token d'accès est proche de l'expiration
 * et tente automatiquement de le rafraîchir si nécessaire.
 *
 * @param token - Le token d'accès JWT actuellement utilisé par l'utilisateur.
 * @param tokenExpiresAt - Le timestamp (en millisecondes) indiquant quand le token expire.
 * @param refreshAccessToken - Fonction asynchrone qui tente de rafraîchir le token. Doit retourner true si le rafraîchissement a réussi.
 *
 * Fonctionnement :
 * - Ce hook démarre un intervalle qui vérifie toutes les 5 minutes si le token va expirer dans moins de 5 minutes.
 * - Si c'est le cas, il appelle automatiquement la fonction `refreshAccessToken`.
 * - Si aucun token ou date d'expiration n'est fourni, aucun intervalle n'est démarré.
 */
export const useTokenChecker = (
  token: string | null,
  tokenExpiresAt: number | null,
  refreshAccessToken: () => Promise<boolean>
) => {
  useEffect(() => {
    if (!token || !tokenExpiresAt) return;

    // Délai avant expiration à partir duquel on tente un rafraîchissement (5 minutes ici)
    const REFRESH_BUFFER_MS = 5 * 60 * 1000;

    // Fréquence à laquelle on vérifie l'état du token (toutes les 5 minutes)
    const INTERVAL_MS = 5 * 60 * 1000;

    // Fonction exécutée périodiquement pour vérifier l'expiration du token
    const checkTokenStatus = async () => {
      const now = Date.now();

      // Si le token expire dans moins de REFRESH_BUFFER_MS, on tente un rafraîchissement
      if (now >= tokenExpiresAt - REFRESH_BUFFER_MS) {
        //console.warn("useTokenChecker.ts Token proche de l'expiration. Tentative de rafraîchissement.");
        const success = await refreshAccessToken();
        if (!success) {
          //console.warn("useTokenChecker.ts Rafraîchissement échoué.");
        }
      }
    };

    // Lancement de la vérification périodique
    const interval = setInterval(checkTokenStatus, INTERVAL_MS);

    // Nettoyage de l'intervalle lorsque le composant est démonté ou que les dépendances changent
    return () => clearInterval(interval);
  }, [token, tokenExpiresAt, refreshAccessToken]);
};