import { TextProps } from "react-native"
import { ThemedTextRender } from "./ThemedText.render"
import { Colors } from "@/constants/Colors";

/**
 * Props du composant ThemedText.
 * 
 * Étend les propriétés de base de `Text` de React Native, avec deux ajouts :
 * 
 * @property {keyof typeof import('./ThemedText.styles').textStyles} [variant] - 
 * Définit la variante typographique à utiliser. Exemples : `'body3'`, `'headline'`, `'caption'`, etc.
 * Si aucune variante n’est spécifiée, `'body3'` est utilisée par défaut.
 * 
 * @property {string} [color] - 
 * Permet de définir la couleur du texte (ex : `"#FF0000"` ou `"blue"`). Si non spécifié, la couleur par défaut du thème sera utilisée.
 */
export type ThemedTextProps = TextProps & {
  variant?: keyof typeof import('./ThemedText.styles').textStyles,
  color?: keyof typeof Colors["light"];
}

/**
 * Composant typographique personnalisable.
 * 
 * Utilise des variantes pré-définies de styles pour afficher du texte avec une hiérarchie visuelle cohérente.
 * Prend également en charge la couleur personnalisée et les styles additionnels.
 * 
 * @param {ThemedTextProps} props - Propriétés du composant ThemedText.
 * @returns Un composant `Text` stylisé selon la variante choisie.
 */
export function ThemedText(props: ThemedTextProps) {
  return <ThemedTextRender {...props} />
}