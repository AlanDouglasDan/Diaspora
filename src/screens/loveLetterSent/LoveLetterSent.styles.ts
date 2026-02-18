import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: 44,
  },
  closeButton: {
    top: 0,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  loveLetterImage: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    ...typography.text22,
    color: palette.WHITE,
    textAlign: "center",
  },
  name: {
    ...typography.header24,
    color: palette.WHITE,
    textAlign: "center",
  },
  button: {
    width: "100%",
    marginTop: 32,
  },
});
