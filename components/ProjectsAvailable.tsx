import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Project = {
  id: number;
  name: string;
  extra_information?: string | null;
  proyecto:any
};

interface Props {
  projects: any[];
  onSelect: (project: Project) => void;
}

export default function ProjectAvailableList({
  projects,
  onSelect,
}: Props) {
  if (!projects.length) {
    return (
      <Text style={styles.empty}>
        No hay proyectos disponibles para este equipo
      </Text>
    );
  }

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => onSelect(item)}
        >
          <View>
            <Text style={styles.title}>📁 {item.name} - {item.proyecto.name}</Text>
            {item.extra_information && (
              <Text style={styles.subtitle}>
                {item.extra_information}
                {/* {item.proyecto.name} */}
              </Text>
            )}
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00377D",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  arrow: {
    fontSize: 28,
    color: "#ccc",
    fontWeight: "300",
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontSize: 14,
  },
});
