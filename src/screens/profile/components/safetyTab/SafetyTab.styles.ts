import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: `${palette.RED2}20`,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
  },
  safetyOption: {
    backgroundColor: palette.WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  text16: {
    ...typography.text16,
    color: palette.TEXT_COLOR,
  },
});
