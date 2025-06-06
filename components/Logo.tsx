import { Image, StyleSheet, View } from "react-native";

type Props = {
  img?: "logo" | "sebProd"; // les images autorisées
};

const images = {
  logo: require("@/assets/images/logo.png"),
  sebProd: require("@/assets/images/sebprod.png"),
};

export default function Logo({ img = "logo" }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={images[img]}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});