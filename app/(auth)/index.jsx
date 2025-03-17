import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "../../assets/styles/login.styles";
import { Link } from "expo-router";
import COLORS from "../../constants/color";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate or show error
      // navigation.navigate("Home"); // if login success
    }, 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollViewStyle}
      keyboardShouldPersistTaps="handled"
    >
      {/* Top Illustration */}
      <View style={styles.topIllustration}>
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color={COLORS.primary} style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your password"
                style={styles.input}
                secureTextEntry={secureEntry}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)} style={styles.eyeIcon}>
                <Feather name={secureEntry ? "eye-off" : "eye"} size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          
          <TouchableOpacity>
          <Link href="/register">
            <Text style={styles.link}>Sign Up</Text>
          </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
