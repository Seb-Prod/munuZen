import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useUser } from "@/contexts/UserContext";

export default function Screen() {
  const colors = useThemeColors();
  const { tokenExpiresAt, refreshTokenExpiresAt } = useUser();

  const [timeLeft, setTimeLeft] = useState<string>("");
  const [refreshCountdown, setRefreshCountdown] = useState<string>("");
  const [tokenDuration, setTokenDuration] = useState<string>("");
  const [refreshTokenExpiryFormatted, setRefreshTokenExpiryFormatted] = useState<string>("");

  useEffect(() => {
  if (!tokenExpiresAt || isNaN(tokenExpiresAt)) return;

  const updateCountdowns = () => {
    const now = Date.now();
    const timeRemaining = tokenExpiresAt - now;

    // temps total du token = temps écoulé + temps restant
    const elapsed = now - (tokenExpiresAt! - timeRemaining);
    const totalTokenDuration = timeRemaining + elapsed;

    if (timeRemaining <= 0) {
      setTimeLeft("Session expirée");
      setRefreshCountdown("N/A");
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);

      const refreshTime = tokenExpiresAt - 5 * 60 * 1000;
      const refreshDiff = refreshTime - now;

      if (refreshDiff <= 0) {
        setRefreshCountdown("En cours ou déjà tenté");
      } else {
        const rMin = Math.floor(refreshDiff / 60000);
        const rSec = Math.floor((refreshDiff % 60000) / 1000);
        setRefreshCountdown(`${rMin}m ${rSec}s`);
      }
    }

    // 🕒 Durée réelle du token
    const totalMin = Math.floor(totalTokenDuration / 60000);
    const totalSec = Math.floor((totalTokenDuration % 60000) / 1000);
    setTokenDuration(`${totalMin}m ${totalSec}s`);
  };

  updateCountdowns();
  const interval = setInterval(updateCountdowns, 1000);
  return () => clearInterval(interval);
}, [tokenExpiresAt]);

  // 📅 Formatage de la date d’expiration du refresh token
  useEffect(() => {
    if (!refreshTokenExpiresAt || isNaN(refreshTokenExpiresAt)) return;

    const date = new Date(refreshTokenExpiresAt);
    const formatted = date.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setRefreshTokenExpiryFormatted(formatted);
  }, [refreshTokenExpiresAt]);

  return (
    <View style={[styles.container, { backgroundColor: colors.ivoire }]}>
      <ThemedText variant="headline" color="vert">Mon planning</ThemedText>

      <ThemedText>⏳ Temps avant expiration : {timeLeft}</ThemedText>
      <ThemedText>🔁 Prochain refresh dans : {refreshCountdown}</ThemedText>
      <ThemedText>🕒 Durée du token : {tokenDuration}</ThemedText>
      <ThemedText>📅 Expiration du refresh token : {refreshTokenExpiryFormatted}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});