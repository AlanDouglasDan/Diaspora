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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  closeButton: {
    padding: 4,
    position: "absolute",
    left: 0,
    top: 12,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerImage: {
    width: 48,
    height: 48,
    marginBottom: 8,
    marginTop: 24,
  },
  title: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    textAlign: "center",
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  searchInput: {
    marginTop: 16,
    marginBottom: 8,
  },
  textInput: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: palette.TEXT_COLOR,
    color: palette.INPUT_TEXT,
  },
  selectContainer: {
    marginTop: 16,
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.GREY,
    marginBottom: 16,
    padding: 8,
    borderRadius: 6,
  },
  listItemLabel: {
    ...typography.semiheader16,
    color: palette.TEXT_COLOR,
    flex: 1,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
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
  singleSelectContainer: {
    marginTop: 16,
    gap: 12,
  },
  singleSelectOption: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: palette.GREY,
    alignItems: "center",
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
  submitButton: {
    marginTop: 24,
  },
});
