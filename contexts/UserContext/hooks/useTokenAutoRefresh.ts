import { useEffect, useRef } from "react";

// Délai avant expiration du token pour déclencher un rafraîchissement (ici 30 secondes)
const REFRESH_BUFFER_MS = 30 * 1000; // 30 secondes

/**
 * Hook personnalisé qui planifie automatiquement un rafraîchissement du token d'accès
 * quelques secondes avant son expiration.
 *
 * @param token - Le token d'accès actuel.
 * @param tokenExpiresAt - Le timestamp (en millisecondes) indiquant quand le token expire.
 * @param refreshAccessToken - Fonction asynchrone qui rafraîchit le token et retourne un booléen selon le succès.
 *
 * Fonctionnement :
 * - Dès que le token ou sa date d’expiration est modifiée, le hook planifie une tâche (`setTimeout`)
 *   pour appeler `refreshAccessToken()` exactement 30 secondes avant son expiration.
 * - Si le token est déjà expiré ou trop proche de l'expiration, il est rafraîchi immédiatement.
 * - Le timeout est nettoyé automatiquement si le hook est relancé ou démonté.
 */
export const useTokenAutoRefresh = (
  token: string | null,
  tokenExpiresAt: number | null,
  refreshAccessToken: () => Promise<boolean>
) => {
  // Référence pour stocker le timeout en cours (utile pour l'annuler proprement)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Si le token ou sa date d'expiration est manquante, on ne fait rien
    if (!token || !tokenExpiresAt) return;

    const now = Date.now();
    const timeUntilRefresh = tokenExpiresAt - REFRESH_BUFFER_MS - now;

    if (timeUntilRefresh <= 0) {
      // Si le token est déjà expiré ou trop proche de l’expiration, on rafraîchit immédiatement
      //console.log("useTokenAutoRefresh.ts", "Token déjà expiré ou proche, rafraîchissement immédiat.");
      refreshAccessToken();
      return;
    }

    // On affiche dans combien de secondes le rafraîchissement aura lieu
    //console.log(`useTokenAutoRefresh.ts Rafraîchissement prévu dans ${Math.floor(timeUntilRefresh / 1000)} secondes.`);

    // On planifie l’appel à refreshAccessToken dans le futur
    timeoutRef.current = setTimeout(() => {
      refreshAccessToken();
    }, timeUntilRefresh);

    // Nettoyage du timeout si le hook est réutilisé ou démonté
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [token, tokenExpiresAt, refreshAccessToken]);
};