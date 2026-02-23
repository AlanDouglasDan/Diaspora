import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.WHITE,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  icon: {
    width: 37,
    height: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.semiheader16,
    color: palette.BLACK,
  },
  message: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginTop: 2,
  },
});
