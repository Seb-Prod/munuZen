export const ROUTES = {
  PLANNING: "/" as const,
  RECIPES: "/recipes" as const,
  SHOPPING_LIST: "/shoppingList" as const,
  ADD_RECIPE: "/addRecipe" as const,
  MENU: "/menu" as const,
  FORGOTPASSWORD: "/screens/forgotPassword" as const
};

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];