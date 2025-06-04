import { Stack } from "expo-router";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export default function RootLayout() {
  const toastConfig = {
    success: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: '600' }}
        text2Style={{ fontSize: 14 }}
      />
    ),
    error: (props:any) => (
      <ErrorToast
        {...props}
        text1Style={{ fontSize: 16, fontWeight: '600' }}
        text2Style={{ fontSize: 14 }}
      />
    ),
    info: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'blue' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: '600' }}
        text2Style={{ fontSize: 14 }}
      />
    ),
  };

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast 
        config={toastConfig} topOffset={70}
      />
    </>
  );
}