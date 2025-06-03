// components/auth/TermsOfUse.tsx
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";

type TermsOfUseProps = {
    onClose: () => void;
};

const termsData = [
    {
        id: 'header',
        type: 'header',
        content: 'Conditions d\'utilisations'
    },
    {
        id: 'intro',
        type: 'text',
        content: 'Les présentes Conditions d\'Utilisation ont pour objet de définir les règles régissant la relation entre MenuZen (et toutes ses déclinaisons de noms de domaine et applications mobiles), ci-après "le site", et ses visiteurs.'
    },
    {
        id: 'section1-title',
        type: 'title',
        content: '1. Acceptation'
    },
    {
        id: 'section1-text',
        type: 'text',
        content: 'L\'utilisation du site et des services qui y sont proposés suppose l\'acceptation pleine et entière par l\'utilisateur des présentes Conditions d\'Utilisation.'
    },
    {
        id: 'section2-title',
        type: 'title',
        content: '2. Droits cédés lors de la soumission de recettes'
    },
    {
        id: 'section2-text',
        type: 'text',
        content: 'En soumettant une ou plusieurs recettes sur le site, vous accordez à la MenuZen l\'autorisation de les publier, éditer, modifier, transmettre, reproduire, traduire, et ce sur tous types de support et à titre gratuit.'
    },
    {
        id: 'section3-title',
        type: 'title',
        content: '3. Responsabilité'
    },
    {
        id: 'section3-text',
        type: 'text',
        content: 'L\'utilisateur est seul responsable du contenu qu\'il publie sur le site. MenuZen se réserve le droit de supprimer tout contenu inapproprié sans préavis.'
    },
    {
        id: 'section4-title',
        type: 'title',
        content: '4. Données personnelles'
    },
    {
        id: 'section4-text',
        type: 'text',
        content: 'Les données personnelles collectées font l\'objet d\'un traitement informatique destiné à améliorer nos services. Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.'
    },
    {
        id: 'section5-title',
        type: 'title',
        content: '5. Modification des conditions'
    },
    {
        id: 'section5-text',
        type: 'text',
        content: 'MenuZen se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés de ces modifications par notification dans l\'application.'
    },
    {
        id: 'section6-title',
        type: 'title',
        content: '6. Contact'
    },
    {
        id: 'section6-text',
        type: 'text',
        content: 'Pour toute question concernant ces conditions d\'utilisation, vous pouvez nous contacter via l\'application MenuZen.'
    }
];

export function TermsOfUse({ onClose }: TermsOfUseProps) {
    const renderItem = ({ item }: { item: typeof termsData[0] }) => {
        switch (item.type) {
            case 'header':
                return (
                    <ThemedText variant="headline" color="vert" style={styles.centerText}>
                        {item.content}
                    </ThemedText>
                );
            case 'title':
                return (
                    <ThemedText variant="subtitle2" style={styles.sectionTitle}>
                        {item.content}
                    </ThemedText>
                );
            case 'text':
                return (
                    <ThemedText style={styles.sectionText}>
                        {item.content}
                    </ThemedText>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={termsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.listContainer}
                showsVerticalScrollIndicator={true}
                bounces={true}
                contentContainerStyle={styles.listContent}
            />
            
            <View style={styles.buttonContainer}>
                <Button label="Retour" onPress={onClose} style={styles.button} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 500, // Hauteur fixe contrainte
        marginTop: 20,
    },
    listContainer: {
        flex: 1,
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
    centerText: {
        textAlign: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    sectionTitle: {
        marginTop: 20,
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
    },
    sectionText: {
        lineHeight: 20,
        marginBottom: 12,
        fontSize: 14,
    },
    buttonContainer: {
        paddingBottom: 10,
    },
    button: {
        alignSelf: "stretch",
    },
});