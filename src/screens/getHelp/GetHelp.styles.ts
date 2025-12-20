import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
    paddingTop: 20,
  },
  fieldLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginBottom: 8,
  },
  input: {
    marginBottom: 24,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  uploadContainer: {
    backgroundColor: palette.GREY,
    borderRadius: 8,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    ...typography.text12,
    color: palette.GREY2,
    marginTop: 4,
  },
  sendButton: {
    ...typography.semiheader16,
    color: palette.RED,
  },
});
