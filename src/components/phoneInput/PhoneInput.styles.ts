import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";
import { font } from "core/utils";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.WHITE,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 12,
    gap: 2,
  },
  callingCode: {
    fontFamily: font.medium,
    fontSize: 16,
    lineHeight: 20,
    color: palette.INPUT_TEXT,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  input: {
    ...typography.text14,
    color: palette.INPUT_TEXT,
    padding: 0,
  },
  modalContainer: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalTitle: {
    ...typography.header18,
    color: palette.INPUT_TEXT,
  },
  cancelText: {
    ...typography.text16,
    color: palette.INPUT_TEXT,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    backgroundColor: palette.GREY,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    ...typography.text14,
    color: palette.INPUT_TEXT,
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  countryName: {
    ...typography.text16,
    color: palette.INPUT_TEXT,
  },
});
