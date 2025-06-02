import { Colors } from "@/constants/Colors"
import { useColorScheme } from "react-native"

/**
 * Hook qui retourne l'objet de couleurs en fonction du thème courant (clair ou sombre).
 *
 * @returns {typeof Colors.light} L'objet de couleurs correspondant au thème.
 */
export function useThemeColors() {
  const theme = useColorScheme() ?? "light"
  return Colors[theme]
}