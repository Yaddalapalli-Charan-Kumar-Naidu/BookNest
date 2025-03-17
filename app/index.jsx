import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter, useSegments } from "expo-router"; // Import useRouter and useSegments from expo-router
import useAuthStore from "../store/authStore"; // Import the authentication store

export default function Index() {
  const { loadUser, isAuthenticated } = useAuthStore(); // Extract login state from your store
  const segments = useSegments(); // Get the current route segments
  const router = useRouter(); // Get the router for navigation

  useEffect(() => {
    loadUser(); 

    if (!isAuthenticated && segments[0] === "(tabs)") {
      router.replace("(auth)"); 
    }

    if (isAuthenticated && segments[0] === "(auth)") {
      router.replace("(tabs)"); 
    }
  }, [isAuthenticated, segments, router, loadUser]); // Dependency array includes all relevant variables

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Link href="/(auth)"><Text>Login</Text></Link> Link to the login page */}
    </View>
  );
}
