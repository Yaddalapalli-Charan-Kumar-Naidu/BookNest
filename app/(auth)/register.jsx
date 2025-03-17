import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../../assets/styles/signup.styles";
import COLORS from "../../constants/color"; // Import your COLORS constant
import { Link } from "expo-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for sign-up button
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password

  // Dummy sign-up function
  const handleSignUp = () => {
    setIsLoading(true); // Start loading

    // Simulate an API call with a 2-second delay
    setTimeout(() => {
      // Log user details to the console
      console.log("User Details:");
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);

      setIsLoading(false); // Stop loading
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>BookNest 📗</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary} // Use COLORS.primary for icon color
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter your username"
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={username}
                  onChangeText={setUsername} // Update username state
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color={COLORS.primary} // Use COLORS.primary for icon color
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="johndoe@gmail.com"
                  style={styles.input}
                  keyboardType="email-address"
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail} // Update email state
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.primary} // Use COLORS.primary for icon color
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="••••••"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={setPassword} // Update password state
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.primary} // Use COLORS.primary for icon color
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[styles.button, isLoading && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} /> // Show loading indicator
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity>
                <Link href="/">
              <Text style={styles.link}>Login</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;