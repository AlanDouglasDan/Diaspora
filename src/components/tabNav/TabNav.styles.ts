import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    paddingBottom: 8,
  },
  tabItem: {
    paddingVertical: 7,
  },
  label: {
    ...typography.semiheader18,
    color: palette.TEXT_COLOR,
  },
  labelActive: {
    ...typography.semiheader18,
    color: palette.TEXT_COLOR,
  },
  indicator: {
    position: "absolute",
    height: 2,
    backgroundColor: palette.TEXT_COLOR,
    bottom: 0,
    left: 0,
    borderRadius: 199,
  },
});
