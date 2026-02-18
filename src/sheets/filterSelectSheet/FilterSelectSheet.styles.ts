import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // maxHeight: "80%",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    textAlign: "center",
  },
  singleSelectContainer: {
    marginTop: 16,
    gap: 12,
  },
  singleSelectOption: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: palette.GREY,
    alignItems: "center",
    marginBottom: 12,
  },
  singleSelectOptionSelected: {
    backgroundColor: `${palette.RED}20`,
    borderWidth: 1,
    borderColor: palette.RED,
  },
  singleSelectLabel: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
    textTransform: "uppercase",
  },
  singleSelectLabelSelected: {
    color: palette.RED,
  },
  multiSelectContainer: {
    marginTop: 16,
  },
  multiSelectItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.GREY,
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  multiSelectLabel: {
    ...typography.semiheader16,
    color: palette.TEXT_COLOR,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.LIGHT_GREY,
    backgroundColor: palette.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: palette.RED,
    borderColor: palette.RED,
  },
  heightContainer: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  heightValueText: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 32,
  },
  submitButton: {
    marginTop: 24,
  },
});
