import { Text } from "react-native"
import { useThemedTextStyle } from "./ThemedText.logic"
import { ThemedTextProps } from "."

/**
 * Composant de rendu pour `ThemedText`.
 *
 * Il applique la logique de style typographique via `useThemedTextStyle`
 * en fonction de la variante et de la couleur spécifiées.
 *
 * Ce composant est séparé pour isoler le rendu pur du composant, facilitant la lecture,
 * les tests et la séparation des responsabilités.
 *
 * @param {ThemedTextProps} props - Propriétés du composant textuel thématisé.
 * @returns Un composant `Text` stylisé selon les règles de typographie définies.
 */
export function ThemedTextRender({ variant = 'body3', color, ...rest }: ThemedTextProps) {
  const computedStyle = useThemedTextStyle(variant, color)
  return <Text style={computedStyle} {...rest} />
}