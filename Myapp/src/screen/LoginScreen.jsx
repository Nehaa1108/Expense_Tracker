import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../utils/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [secureText, setSecureText] = useState(true);
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // 🔥 TEMPORARY FAKE LOGIN (Later replace with API)
      if (email === "admin@gmail.com" && password === "123456") {
        
        // Save token (structure ready for backend)
        await AsyncStorage.setItem("token", "dummy_token");

        navigation.replace("Home");
      } else {
        Alert.alert("Invalid Credentials", "Email or password incorrect");
      }

    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Student Attendance</Text>

       <TextInput
  label="Email"
  mode="outlined"
  value={email}
  onChangeText={setEmail}
  style={styles.input}
  autoCapitalize="none"
  textColor={colors.black}
  outlineColor={colors.border}
  activeOutlineColor={colors.primary}
  cursorColor={colors.primary}
/>

<TextInput
  label="Password"
  mode="outlined"
  secureTextEntry={secureText}
  value={password}
  onChangeText={setPassword}
  style={styles.input}
  textColor={colors.black}
  outlineColor={colors.border}
  activeOutlineColor={colors.primary}
  cursorColor={colors.primary}
  right={
    <TextInput.Icon
      icon={secureText ? "eye-off" : "eye"}
      onPress={() => setSecureText(!secureText)}
      color={colors.primary}
    />
  }
/>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleLogin}
          >
            Login
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: colors.primary,
  },
  input: {
    marginBottom: 15,
    color: colors.black,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});