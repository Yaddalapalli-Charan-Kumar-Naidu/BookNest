import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter,Stack } from "expo-router"; // Import router
import useAuthStore from "../store/authStore"; // Import the authentication store
import SafeScreen from "../components/SafeScreen";

export default function RootLayout() {
  const { loadUser, isAuthenticated } = useAuthStore(); // Extract login state from your store
  const router = useRouter(); // Get the router for navigation

  // Check authentication status on mount
  useEffect(() => {
    loadUser(); // Load user details on mount

    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      router.replace("(auth)"); // Replace with the login page
    } else {
      // Redirect to tabs if user is authenticated
      router.replace("(tabs)"); // Replace with the main tabs page
    }
  }, [isAuthenticated, router, loadUser]); // Only run when isAuthenticated or loadUser changes


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
