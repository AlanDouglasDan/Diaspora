import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";
import { font } from "core/utils";

export const styles = StyleSheet.create({
  label: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
    marginBottom: 4,
  },
  container: {
    backgroundColor: palette.WHITE,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  input: {
    fontFamily: font.medium,
    fontSize: 16,
    lineHeight: 20,
    color: palette.INPUT_TEXT,
    padding: 0,
  },
});
