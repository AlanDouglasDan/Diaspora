import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  title: {
    ...typography.header32,
    color: palette.WHITE,
    marginTop: 24,
  },
  subtitle: {
    ...typography.text16,
    color: palette.WHITE,
    marginTop: 12,
  },
  codeFieldContainer: {
    marginTop: 32,
  },
  cell: {
    backgroundColor: palette.WHITE,
    borderRadius: 6,
    paddingVertical: 12,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    ...typography.header20,
    color: palette.INPUT_TEXT,
    textAlign: "center",
  },
  button: {
    backgroundColor: palette.WHITE,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  header14: {
    ...typography.header14,
    color: palette.WHITE,
    marginTop: 24,
    textDecorationLine: "underline",
  },
});
