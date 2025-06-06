type Theme = "light" | "dark"

type ThemeColors = {
  vert: string
  jaune: string
  ivoire: string
  rouge:string
  fondNavBar: string
  texte:string
  fondInput:string
  ombre:string
  separateur:string
}

export const Colors: Record<Theme, ThemeColors> = {
  light: {
    vert: "#009B4D",
    jaune: "#FFCC00",
    ivoire: "#FAF5E9",
    rouge:"#FF0000",
    fondNavBar: "#FDFEFE",
    texte:"#2a2a2a",
    fondInput:"#FDFEFE",
    ombre:"#000",
    separateur:"#dfdfdf",
  },
  dark: {
    vert: "#00C46A",
    jaune: "#FFD93B",
    ivoire: "#1E1E1E",
    rouge:'#8B0000',
    fondNavBar:"#303030",
    texte:"#dfdfdf",
    fondInput:"#3e3e3e",
    ombre:"#000",
    separateur:"#2a2a2a",
  },
}

export function getSafeTheme(theme: string | null | undefined): Theme {
  return theme === "dark" ? "dark" : "light";
}