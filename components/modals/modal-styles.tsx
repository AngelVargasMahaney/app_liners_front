import { colors, font, radius, spacing } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },

  title: {
    fontSize: font.title,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.xs,
    backgroundColor: "#fafafa",
  },

  label: {
    fontSize: font.normal,
    fontWeight: "600",
    marginTop: spacing.sm,
  },

  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
    backgroundColor: "#fafafa",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: spacing.md,
  },

  btnCancel: {
    backgroundColor: colors.muted,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginRight: spacing.sm,
  },

  btnSave: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: radius.sm,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
