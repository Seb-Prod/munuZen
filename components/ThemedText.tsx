import { Colors } from "@/constants/Colors"
import { useThemeColors } from "@/hooks/useThemeColors"
import { StyleSheet, Text, type TextProps } from "react-native"
const styles = StyleSheet.create({
  /**
   * Texte secondaire ou de support.
   * Petite taille, utile pour les annotations ou textes très discrets.
   */
  body3: {
    fontSize: 14,
    lineHeight: 16,
  },

  /**
   * Titre principal ou très important.
   * Taille large et gras, pour attirer l'attention.
   */
  headline: {
    fontSize: 22,
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

type Props = TextProps & {
  variant?: keyof typeof styles,
  color?: keyof typeof Colors["light"]
}
export function ThemedText({ variant, color, style, ...rest }: Props) {
  const colors = useThemeColors()
  return <Text style={[
    styles[variant ?? 'body3'],
    { color: colors[color ?? "texte"] },
    style
  ]} {...rest} />
}

