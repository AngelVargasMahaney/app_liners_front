import React, { useMemo, useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  visible: boolean;
  title: string;
  data: any[];
  labelKey?: string;
  onClose: () => void;
  onSelect: (item: any) => void;
}

export default function SelectModal({
  visible,
  title,
  data,
  labelKey = "name",
  onClose,
  onSelect,
}: Props) {

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return data.filter((item) =>
      item[labelKey]?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  return (
    <Modal visible={visible} animationType="slide">

      <View style={styles.container}>

        <Text style={styles.title}>{title}</Text>

        <TextInput
          placeholder="Buscar..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text>{item[labelKey]}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity onPress={onClose}>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Cancelar
          </Text>
        </TouchableOpacity>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 10 },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
