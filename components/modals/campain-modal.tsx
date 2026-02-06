import { createCampaign } from "@/api/client";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CampaignModal({ visible, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");

  const handleSave = async () => {
    if (!name.trim()) return;

    await createCampaign({
      name,
      extra_information: extra,
      type: 1, // CAMPAÑA
      user: 1,
    });

    setName("");
    setExtra("");
    onCreated();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Nueva Campaña</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Descripción (opcional)"
            value={extra}
            onChangeText={setExtra}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={onClose}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnSave}
              onPress={handleSave}
            >
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  btnCancel: {
    backgroundColor: "#999",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  btnSave: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
