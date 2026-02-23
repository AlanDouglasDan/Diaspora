import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
    paddingTop: 50,
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
    marginTop: 24,
  },
  gap: {
    gap: 22,
  },
  flexedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    alignSelf: "center",
    backgroundColor: palette.TEXT_COLOR,
    paddingVertical: 4,
    paddingHorizontal: 32,
    borderRadius: 60,
  },
  badgeText: {
    ...typography.header11,
    color: palette.WHITE,
  },
  text10: {
    ...typography.text10,
    color: palette.INPUT_TEXT,
    marginTop: 12,
  },
  header10: {
    ...typography.header10,
    color: palette.BLACK,
  },
});
