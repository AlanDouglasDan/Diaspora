import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 30,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  whiteContainer: {
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    ...typography.semiheader16,
    color: palette.WHITE,
  },
  whiteTitle: {
    color: palette.BLACK,
  },
  prefixIcon: {
    marginRight: 8,
  },
  suffixIcon: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
