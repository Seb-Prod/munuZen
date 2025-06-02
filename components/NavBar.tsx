import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ButtonIcon } from "./ButtonIcon";

export function NavBar() {
    const route = useRoute();

    useEffect(() => {
        console.log('Nom de la page actuelle : ', route.name)
    }, [route]);

    const links = [
        { iconName: "home-outline", link: "/recipes", label: "Recettes" },
        { iconName: "calendar-outline", link: "/", label: "Planning" },
        { iconName: "cart-outline", link: "shoppingList", label: "Ma litste" },
        { iconName: "add-circle-outline", link: "addRecipe", label: "Soumettre" },
        { iconName: "menu", link: "menu", label: "Menu" }
    ] as const;

    const routeName = route.name.toLowerCase();

    return (
        <View style={styles.navBar}>
            {links.map(({ iconName, link, label }, index) => {
                const linkName = link.toLowerCase().replace("/", "");

                const isActive = routeName === linkName;

                return (
                    <ButtonIcon
                        key={index}
                        iconName={iconName}
                        link={`/${linkName}`}
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
        marginBottom: 12,
    },
});