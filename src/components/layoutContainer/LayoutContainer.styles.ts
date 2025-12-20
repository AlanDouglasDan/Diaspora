import { Platform, StyleSheet } from "react-native";

import { palette } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "ios" ? 24 : 54,
  },
});
