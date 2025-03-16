import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";


import SafeScreen from "../components/SafeScreen"
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <StatusBar style="dark"/>
      <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
