type Theme = "light" | "dark"

type ThemeColors = {
  vert: string
  jaune: string
  ivoire: string
}

export const Colors: Record<Theme, ThemeColors> = {
  light: {
    vert: "#009B4D",
    jaune: "#FFCC00",
    ivoire: "#FAF5E9",
  },
  dark: {
    vert: "#00C46A",
    jaune: "#FFD93B",
    ivoire: "#1E1E1E",
  },
}