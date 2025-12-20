import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  subtitle: {
    ...typography.text16,
    color: palette.TEXT_COLOR,
    textAlign: "center",
  },
  title: {
    ...typography.header32,
    color: palette.BLACK,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 32,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...typography.semiheader16,
    color: palette.WHITE,
  },
});
