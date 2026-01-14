import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 44,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: palette.SATURATED_RED,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  title: {
    ...typography.header42,
    color: palette.WHITE,
  },
  subtitle: {
    ...typography.semiheader18,
    color: palette.WHITE,
    marginTop: 32,
  },
  logo: {
    width: 164,
    height: 31,
    marginBottom: 42,
  },
  button: {
    width: "100%",
    marginTop: 12,
  },

  // splash styles
  splashContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
});
