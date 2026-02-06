import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Slot } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminLayout = () => (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.container}>
            {/* ================= HEADER ================= */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Feather name="menu" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>¡Hola, Juan Perez!</Text>

                <TouchableOpacity>
                    <Feather name="refresh-cw" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            
            {/* ================= CONTENIDO DINÁMICO ================= */}
            <View style={styles.content}>
                <Slot />
            </View>

            {/* ================= FOOTER ================= */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <MaterialIcons name="home" size={24} color="#999" />
                    <Text style={styles.footerText}>Inicio</Text>
                </View>

                <View style={styles.footerItem}>
                    <MaterialIcons name="build" size={24} color="#1e88e5" />
                    <Text style={styles.footerTextActive}>Medición</Text>
                </View>

                <View style={styles.footerItem}>
                    <MaterialIcons name="description" size={24} color="#999" />
                    <Text style={styles.footerText}>Reportes</Text>
                </View>
            </View>
        </View>

    </SafeAreaView>
);

export default AdminLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1e88e5"
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  /* FOOTER */
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    paddingVertical: 10,
    backgroundColor: "#ffffff"
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  footerText: {
    fontSize: 11,
    color: "#999999",
    marginTop: 2
  },
  footerTextActive: {
    fontSize: 11,
    color: "#1e88e5",
    marginTop: 2,
    fontWeight: "600"
  }
});
