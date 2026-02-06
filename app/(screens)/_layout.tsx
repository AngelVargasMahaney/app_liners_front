import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreensLayout = () => (
  <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
    {/* HEADER */}
    <View style={styles.header}>
      <TouchableOpacity>
        <Feather name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>¡Hola, Juan Perez</Text>

      <TouchableOpacity>
        <Feather name="refresh-cw" size={20} color="#fff" />
      </TouchableOpacity>
    </View>

    {/* CONTENIDO */}
    <View style={styles.content}>
      <Slot />
    </View>

    {/* FOOTER */}
    <View style={styles.footer}>
      <View style={styles.footerItem}>
        <MaterialIcons name="home" size={24} color="#1e88e5" />
        <Text style={styles.footerTextActive}>Inicio</Text>
      </View>

      <View style={styles.footerItem}>
        <MaterialIcons name="build" size={24} color="#999" />
        <Text style={styles.footerText}>Medición</Text>
      </View>

      <TouchableOpacity style={styles.footerItem} onPress={()=>{
        console.log("A")
      }}>
        <MaterialIcons name="description" size={24} color="#999" />
        <Text style={styles.footerText}>Reportes</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default ScreensLayout;

const styles = StyleSheet.create({
  /* =========================
     CONTENEDOR PRINCIPAL
  ========================== */
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  /* =========================
     HEADER
  ========================== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1e88e5",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* =========================
     CONTENIDO DINÁMICO
  ========================== */
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  /* =========================
     FOOTER
  ========================== */
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },

  footerItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    fontSize: 11,
    color: "#999999",
    marginTop: 2,
  },

  footerTextActive: {
    fontSize: 11,
    color: "#1e88e5",
    marginTop: 2,
    fontWeight: "600",
  },
});