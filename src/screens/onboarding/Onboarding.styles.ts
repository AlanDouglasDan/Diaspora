import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  header: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginTop: 16,
  },
  imageWrapper: {
    position: "relative",
    width: wp("100%"),
    marginTop: 24,
    overflow: "hidden",
    marginHorizontal: -20,
  },
  image: {
    width: "100%",
    height: 450,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: `${palette.WHITE}55`,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginTop: 8,
  },
  button: {
    marginTop: 52,
  },
});
