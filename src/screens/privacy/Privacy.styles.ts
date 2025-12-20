import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  section: {
    paddingVertical: 8,
    marginTop: 32,
    marginHorizontal: -20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: palette.GREY,
  },
  rowLabel: {
    ...typography.semiheader14,
    color: palette.GREY2,
  },
  noteText: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
    paddingHorizontal: 20,
  },
});
