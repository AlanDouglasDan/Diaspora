import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  title: {
    color: palette.WHITE,
    ...typography.header32,
    marginTop: 24,
  },
  subtitle: {
    color: palette.WHITE,
    marginTop: 12,
    ...typography.text16,
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
});
