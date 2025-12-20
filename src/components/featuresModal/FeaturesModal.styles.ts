import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

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
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    height: 25,
    width: 180,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  featureLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  featureValue: {
    ...typography.text14,
    color: palette.BLACK,
  },
  closeActionButton: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: palette.BLACK,
  },
});
