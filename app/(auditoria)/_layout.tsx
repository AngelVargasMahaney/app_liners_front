import { useRegistroStore } from "@/store/useRegistroStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Slot, router, usePathname } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuditoriaLayout = () => {
  const pathname = usePathname();

  // Grilla EXACTA 3x3
  const cells = [
    // Fila 1
    { label: "AUDITORÍA", parent: true },
    { label: "VERIFICACIÓN DE PERNOS", path: "/verificacion-pernos" },
    { label: "CALIBRACIÓN DE LLAVES", path: "/calibracion-llaves" },

    // Fila 2
    { label: "SHELL", path: "/shell" },
    { label: "T. ALIMENTACIÓN", path: "/alimentacion" },
    { label: "T. DESCARGA", path: "/t-descarga" },

    // Fila 3
    { label: "INSTALACIÓN DE PERNOS", path: "/instalacion-pernos" },
    { label: "RUBBER BACKING", path: "/rubber-backing" },
    { label: "SENSORES", path: "/sensores" }
  ];
  const { infoData } = useRegistroStore()

  return (
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

        {/* ================= GRILLA 3x3 ================= */}
        <View style={{
          backgroundColor: '#002060'
        }}>
          <Text style={{ textAlign: 'center', color: 'white', padding: 5, textTransform: 'uppercase', fontWeight: 'bold', fontSize: 20 }}>{infoData.equipo}</Text>
        </View>
        <View style={styles.grid}>
          {cells.map((cell, index) => {
            // AUDITORÍA (padre)
            if (cell.parent) {
              return (
                <View key={index} style={[styles.cell, styles.parent]}>
                  <Text style={styles.parentText}>{cell.label}</Text>
                </View>
              );
            }

            const isActive = pathname === cell.path;

            return (
              <TouchableOpacity
                key={cell.path}
                onPress={() => router.push(cell.path!)}
                style={[
                  styles.cell,
                  isActive && styles.active
                ]}
              >
                <Text
                  style={[
                    styles.cellText,
                    isActive && styles.cellTextActive
                  ]}
                  numberOfLines={2}
                >
                  {cell.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
};

export default AuditoriaLayout;

/* =========================
   STYLES
========================== */

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

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff"
  },
  cell: {
    width: "33.3333%",
    height: 46,
    borderWidth: 0.5,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    backgroundColor: "#fff"
  },
  parent: {
    backgroundColor: "#ffeb3b"
  },
  parentText: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center"
  },
  active: {
    backgroundColor: "#ffeb3b"
  },
  cellText: {
    fontSize: 10.5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
  },
  cellTextActive: {
    color: "#000"
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
