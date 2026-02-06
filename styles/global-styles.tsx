import { StyleSheet } from "react-native";
import { colors, font, radius, spacing } from "./theme";

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },

  card: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  title: {
    fontSize: font.title,
    fontWeight: "700",
    color: colors.text,
  },

  subtitle: {
    fontSize: font.normal,
    color: colors.muted,
  },

  sectionTitle: {
    fontSize: font.big,
    fontWeight: "800",
    marginVertical: spacing.sm,
    color: colors.text,
  },

  buttonPrimary: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: radius.sm,
    alignItems: "center",
  },

  buttonSecondary: {
    backgroundColor: colors.secondary,
    padding: spacing.sm,
    borderRadius: radius.sm,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
