import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {},
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
  },
  valueText: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
  },
  sliderContainer: {
    height: 24,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  trackBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.GREY,
  },
  trackGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 2,
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
