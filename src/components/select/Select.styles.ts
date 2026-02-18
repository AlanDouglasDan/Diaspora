import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  label: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
    marginBottom: 4,
  },
  dropdown: {
    backgroundColor: palette.GREY,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 0,
  },
  dropdownContainer: {
    backgroundColor: palette.WHITE,
    borderRadius: 6,
    borderWidth: 0,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderStyle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  selectedTextStyle: {
    ...typography.text14,
    color: palette.INPUT_TEXT,
  },
  itemTextStyle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: palette.GREY2,
  },
  selectedItemStyle: {
    borderRadius: 14,
    backgroundColor: `${palette.PINK}20`,
  },
});
