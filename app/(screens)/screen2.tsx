import { useRegistroStore } from "@/store/useRegistroStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen2() {

  const { infoData } = useRegistroStore();

  console.log("infoData", infoData);

  const [viewModal, setViewModal] = useState<boolean>(false)


  const handleNavigate = () => {

    if (infoData.actividad === '1') {
      router.push({ pathname: `/alimentacion` })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={viewModal}
        onRequestClose={() => setViewModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setViewModal(false)} style={{ position: 'absolute', right: 10, top: 3 }}>
              <MaterialIcons name="close" size={22} color="red" />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#1e88e5",
                borderRadius: 4,
                overflow: "hidden",
                marginVertical: 10,
              }}
            >
              {/* HEADER */}
              <View
                style={{
                  backgroundColor: "#1e88e5",
                  paddingVertical: 6,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 13,
                  }}
                >
                  {infoData.equipo}
                </Text>
              </View>

              {/* ROW: TENSIÓN */}
              <View style={{ flexDirection: "row", minHeight: 40 }}>
                <View
                  style={{
                    width: "35%",
                    backgroundColor: "#1976d2",
                    justifyContent: "center",
                    paddingHorizontal: 8,
                    borderRightWidth: 1,
                    borderRightColor: "#ffffff",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    Tensión:
                  </Text>
                </View>

                <View
                  style={{
                    width: "65%",
                    backgroundColor: "#ffe082",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    justifyContent: "center",
                  }}
                >
                  <TextInput style={{ fontSize: 12, color: "#000" }} placeholder="Llenado por ADM de acuerdo a campaña" />
                </View>
              </View>

              {/* ROW: TORQUE */}
              <View style={{ flexDirection: "row", minHeight: 40 }}>
                <View
                  style={{
                    width: "35%",
                    backgroundColor: "#1976d2",
                    justifyContent: "center",
                    paddingHorizontal: 8,
                    borderRightWidth: 1,
                    borderRightColor: "#ffffff",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    Torque:
                  </Text>
                </View>

                <View
                  style={{
                    width: "65%",
                    backgroundColor: "#ffe082",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    justifyContent: "center",
                  }}
                >
                  <TextInput style={{ fontSize: 12, color: "#000" }} placeholder="Llenado por ADM de acuerdo a campaña" />
                </View>
              </View>

              {/* ROW: ADJUNTOS */}
              <View style={{ flexDirection: "row", minHeight: 60 }}>
                <View
                  style={{
                    width: "35%",
                    backgroundColor: "#1976d2",
                    justifyContent: "center",
                    paddingHorizontal: 8,
                    borderRightWidth: 1,
                    borderRightColor: "#ffffff",
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    Adjuntos:
                  </Text>
                </View>

                <View
                  style={{
                    width: "65%",
                    backgroundColor: "#ffe082",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                    justifyContent: "center",
                  }}
                >
                  <TextInput style={{ fontSize: 12, color: "#000" }} placeholder="Procedimiento de instalación" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* EQUIPO */}
      <View style={styles.equipoBox}>
        <MaterialIcons name="precision-manufacturing" size={22} color="#555" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.equipoTitle}>{infoData.equipo}</Text>
          <Text style={styles.equipoSub}>0310-MLS-0001</Text>
        </View>
      </View>

      <Text style={styles.subTitle}>
        Registro de Cambio de Liners y Pernos
      </Text>

      {/* BOTONES */}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => setViewModal(true)} style={styles.editButton}>
            <Feather name="edit" size={18} color="#1e88e5" />
            <Text style={styles.editText}>Editar Registro</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={() => handleNavigate()} style={[styles.editButton, { borderColor: 'red' }]}>
            <Feather name="edit" size={18} color="red" />
            <Text style={[styles.editText, { color: 'red' }]}>Registrar Datos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DATOS REGISTRO */}
      <View style={styles.dataBox}>
        <Text style={styles.dataTitle}>Datos de Registro:</Text>
        <Text style={styles.dataText}>
          Nombre: REL-REP-2025-09-01-MOLINO-SAG
        </Text>
        <Text style={styles.dataText}>Fecha inicio: 2025-09-01</Text>
        <Text style={styles.dataText}>Fecha final: 2025-09-05</Text>
      </View>

      {/* BOTON RESUMEN */}
      <TouchableOpacity style={styles.summaryButton}>
        <Text style={styles.summaryText}>RESUMEN</Text>
      </TouchableOpacity>

      {/* IMAGEN */}
      <Image
        source={{
          uri: "https://i.imgur.com/7QF6FzY.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.imageLabel}>Colocar Imagen real del equipo</Text>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  equipoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    margin: 12,
    borderRadius: 8,
  },

  equipoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  equipoSub: {
    fontSize: 12,
    color: "#666",
  },

  subTitle: {
    textAlign: "center",
    color: "#888",
    marginBottom: 8,
  },

  buttonsRow: {
    flexDirection: "row",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#1e88e5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
  },

  editText: {
    color: "#1e88e5",
    marginLeft: 6,
    fontWeight: "500",
  },

  registerButton: {
    backgroundColor: "#ffb300",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },

  registerText: {
    color: "#fff",
    fontWeight: "600",
  },

  dataBox: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 12,
    borderRadius: 8,
  },

  dataTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },

  dataText: {
    fontSize: 13,
    color: "#444",
  },

  summaryButton: {
    borderColor: "#d32f2f",
    borderWidth: 1,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  summaryText: {
    color: "#d32f2f",
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },

  imageLabel: {
    textAlign: "center",
    color: "#d32f2f",
    marginBottom: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },

  footerItem: {
    alignItems: "center",
  },

  footerText: {
    fontSize: 11,
    color: "#999",
  },

  footerTextActive: {
    fontSize: 11,
    color: "#1e88e5",
  },
});