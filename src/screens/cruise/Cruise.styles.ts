import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
    paddingTop: 70,
  },
  header18: {
    ...typography.header18,
    color: palette.TEXT_COLOR,
    textAlign: "center",
  },
  text14: {
    ...typography.text14,
    color: palette.INPUT_TEXT,
  },
  headerRight: {
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: 180,
  },
  gap: {
    gap: 22,
  },
  flexedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
