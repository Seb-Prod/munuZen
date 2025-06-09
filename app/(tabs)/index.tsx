import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useUser } from "@/contexts/UserContext";

export default function Screen() {
  const colors = useThemeColors();
  const { tokenExpiresAt } = useUser();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!tokenExpiresAt) return;

    const expiresAt = tokenExpiresAt;

    if (isNaN(expiresAt)) return;

    const updateTimeLeft = () => {
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeLeft("Session expirée");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
    };

    updateTimeLeft(); // appel immédiat
    const interval = setInterval(updateTimeLeft, 1000); // maj chaque seconde

    return () => clearInterval(interval);
  }, [tokenExpiresAt]);

  return (
    <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <ThemedText variant="headline" color="vert">Mon planning</ThemedText>
      <ThemedText>
        Temps avant expiration : {timeLeft}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});