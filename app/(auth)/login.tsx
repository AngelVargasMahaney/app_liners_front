import { useRegistroStore } from "@/store/useRegistroStore";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { infoData, setInfoData } = useRegistroStore()



  const handleLogin = () => {
    if (email === 'admin') {
      setInfoData({
        ...infoData,
        role: 'admin'
      })
      router.push("/(admin)/main");
    } else if(email === '3'){
      router.push("/(auditoria)/alimentacion");
    } else {
      setInfoData({
        ...infoData,
        role: 'user'
      })
      router.push("/(users)/screen1");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../assets/images/login.jpg")}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Capa oscura */}
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.title}>Bienvenido 👋</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#555"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#555"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={[styles.button, { backgroundColor: email === '' ? 'gray' : 'rgba(32, 29, 189, 0.93)' }]}
            disabled={email === ''} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // centra todo verticalmente
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  container: {
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.15)",
    color: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  button: {
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    color: "#eee",
  },
  link: {
    color: "#fff",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
