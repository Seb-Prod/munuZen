type Theme = "light" | "dark"

type ThemeColors = {
  vert: string
  jaune: string
  ivoire: string
  fondNavBar: string
  texte:string
}

export const Colors: Record<Theme, ThemeColors> = {
  light: {
    vert: "#009B4D",
    jaune: "#FFCC00",
    ivoire: "#FAF5E9",
    fondNavBar: "#FDFEFE",
    texte:"#2a2a2a"
  },
  dark: {
    vert: "#00C46A",
    jaune: "#FFD93B",
    ivoire: "#1E1E1E",
    fondNavBar:"#1A1A1A",
    texte:"#646464"
  },
}

export function getSafeTheme(theme: string | null | undefined): Theme {
  return theme === "dark" ? "dark" : "light";
}