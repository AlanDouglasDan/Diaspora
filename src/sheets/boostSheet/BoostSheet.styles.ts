import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 4,
    zIndex: 2,
  },
  imageContainer: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: "center",
  },
  boostImage: {
    width: wp(100) - 24,
    height: 250,
  },
  title: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  keepSwipingButton: {
    width: "100%",
  },
});
