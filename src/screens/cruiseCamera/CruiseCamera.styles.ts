import { StyleSheet } from "react-native";

import { palette } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 44,
  },
  flipButton: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
