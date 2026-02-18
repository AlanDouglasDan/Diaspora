import { StyleSheet } from "react-native";

import { palette } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    position: "absolute",
    top: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  likeLabel: {
    left: 30,
    backgroundColor: "#4DED30",
  },
  nopeLabel: {
    right: 30,
    backgroundColor: palette.RED,
  },
  labelText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  likeLabelText: {
    color: palette.WHITE,
  },
  nopeLabelText: {
    color: palette.WHITE,
  },
});
