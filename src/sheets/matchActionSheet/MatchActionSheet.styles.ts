import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 12,
    padding: 8,
    zIndex: 2,
  },
  image: {
    width: 220,
    height: 200,
    marginTop: 12,
    marginBottom: 20,
  },
  title: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  seePlansButton: {
    width: "100%",
  },
});
