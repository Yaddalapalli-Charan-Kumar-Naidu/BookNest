import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import styles from "../../assets/styles/login.styles";
import { Link,useRouter } from "expo-router";
import COLORS from "../../constants/color";
import useAuthStore from "../../store/authStore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);

  const { login, isAuthenticated, loading, error } = useAuthStore();
  const router=useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("(tabs)"); // 👈 Use replace to avoid going back to login
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (!success && error) {
      Alert.alert("Login Error", error);
    }
    console.log("Success:",success);
    
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollViewStyle}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topIllustration}>
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.formContainer}>
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
