import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  const colors =useThemeColors();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.ivoire}]}>
      <ThemedText variant="headline" color="vert">MenuZen</ThemedText>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
