import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: `${palette.BLACK}80`,
  },
  modalContainer: {
    backgroundColor: palette.WHITE,
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: wp("90%"),
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 4,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  cruiseIcon: {
    width: 120,
    height: 100,
    backgroundColor: palette.WHITE,
  },
  title: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  upgradeButton: {
    width: "100%",
  },
  maybeLaterButton: {
    marginTop: 12,
    padding: 8,
  },
  maybeLaterText: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
});
