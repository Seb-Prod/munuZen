import { View, StyleSheet } from "react-native";
import { ButtonIcon } from "./ButtonIcon";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { ROUTES, RoutePath } from "@/constants/Routes"; // adapt path
import { Ionicons } from "@expo/vector-icons";

export function NavBar() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Page active :", pathname);
  }, [pathname]);

  const links: {
    iconName: keyof typeof Ionicons.glyphMap;
    path: RoutePath;
    label: string;
  }[] = [
    { iconName: "home-outline", path: ROUTES.RECIPES, label: "Recettes" },
    { iconName: "calendar-outline", path: ROUTES.PLANNING, label: "Planning" },
    { iconName: "cart-outline", path: ROUTES.SHOPPING_LIST, label: "Ma liste" },
    { iconName: "add-circle-outline", path: ROUTES.ADD_RECIPE, label: "Soumettre" },
    { iconName: "menu", path: ROUTES.MENU, label: "Menu" },
  ];

  return (
    <View style={styles.navBar}>
      {links.map(({ iconName, path, label }, index) => {
        const isActive = pathname === path;
        return (
          <ButtonIcon
            key={index}
            iconName={iconName}
            link={path}
            label={label}
            active={isActive}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});