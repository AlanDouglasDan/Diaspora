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
  optionsContainer: {
    marginTop: 32,
    gap: 16,
  },
  option: {
    backgroundColor: palette.GREY,
    borderRadius: 6,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  optionSelected: {
    borderWidth: 1,
    borderColor: palette.RED,
    backgroundColor: `${palette.RED2}20`,
  },
  optionText: {
    ...typography.semiheader16,
    color: palette.TEXT_COLOR,
  },
  optionTextSelected: {
    color: palette.RED,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  checkboxLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
