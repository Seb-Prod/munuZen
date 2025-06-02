import { StyleSheet } from "react-native"

/**
 * Styles typographiques réutilisables pour le composant `ThemedText`.
 *
 * Chaque style correspond à une hiérarchie visuelle prédéfinie (headline, subtitle, body, etc.),
 * visant à assurer une cohérence dans toute l'application.
 */
export const textStyles = StyleSheet.create({
  /**
   * Texte secondaire ou de support.
   * Petite taille, utile pour les annotations ou textes très discrets.
   */
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },

  /**
   * Titre principal ou très important.
   * Taille large et gras, pour attirer l'attention.
   */
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },

  /**
   * Texte d'information très petit, souvent utilisé pour les étiquettes ou légendes.
   */
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },

  /**
   * Sous-titre standard ou titre secondaire important.
   */
  subtitle1: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: "bold",
  },

  /**
   * Sous-titre un peu plus petit, pour des hiérarchies intermédiaires.
   */
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },

  /**
   * Texte de type étiquette ou sous-sous-titre, très compact mais gras.
   */
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
})