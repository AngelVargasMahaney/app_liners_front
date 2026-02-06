import { StyleSheet } from "react-native";

export const campaignStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  description: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
