import { StyleSheet, Dimensions } from "react-native";

import { palette } from "core/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  list: {
    flex: 1,
  },
  item: {
    width: SCREEN_WIDTH,
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
