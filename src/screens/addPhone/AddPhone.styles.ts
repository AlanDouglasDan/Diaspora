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
  inputContainer: {
    marginTop: 32,
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
  skipText: {
    ...typography.semiheader16,
    color: palette.WHITE,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
