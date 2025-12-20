import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  progressBar: {
    marginTop: 16,
    marginHorizontal: -20,
  },
  title: {
    ...typography.header32,
    color: palette.BLACK,
    marginTop: 32,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginTop: 12,
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 32,
    gap: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
