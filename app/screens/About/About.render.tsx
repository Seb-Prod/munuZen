import React from "react";
import { ScrollView, Image, Text } from "react-native"
import { aboutLogic } from "./About.logic"
import styles from './About.styles';

const AboutRender: React.FC = () => {
    const { appName, version, description, logo } = aboutLogic();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.appName}>{appName}</Text>
            <Text style={styles.version}>Version {version}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
};

export default AboutRender;