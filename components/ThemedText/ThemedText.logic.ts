import { TextStyle } from "react-native"
import { textStyles } from "./ThemedText.styles"
import { useThemeColors } from "@/hooks/useThemeColors"

/**
 * Hook utilitaire qui assemble les styles pour le composant `ThemedText`.
 *
 * Combine trois couches de style :
 * - Le style de base en fonction de la variante choisie (`textStyles[variant]`)
 * - Une couleur personnalisée si définie
 * - Des styles additionnels passés via la prop `style`
 *
 * @param {keyof typeof textStyles} variant - Variante typographique à utiliser (ex. `'headline'`, `'caption'`).
 * @param {string} [color] - Couleur personnalisée à appliquer au texte (ex : `"red"`, `"#333"`, etc.).
 * @param {TextStyle | TextStyle[]} [customStyle] - Styles supplémentaires à fusionner avec ceux du thème.
 *
 * @returns {TextStyle[]} Un tableau de styles à appliquer au composant `Text`.
 */
export function useThemedTextStyle(
  variant: keyof typeof textStyles,
  color?: string,
  customStyle?: TextStyle | TextStyle[]
): TextStyle[] {
  const themeColors = useThemeColors()

  const baseStyle = textStyles[variant]
  const resolvedColor = color && themeColors[color as keyof typeof themeColors]
  const colorStyle = resolvedColor ? { color: resolvedColor } : color ? { color } : {}

  return [baseStyle, colorStyle, customStyle].filter(Boolean) as TextStyle[]
}