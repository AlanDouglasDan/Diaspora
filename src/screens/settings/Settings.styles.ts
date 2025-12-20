import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${palette.RED2}25`,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 8,
  },
  headerTitle: {
    ...typography.header18,
    color: palette.BLACK,
  },
  section: {
    backgroundColor: palette.WHITE,
    paddingVertical: 8,
    marginTop: 32,
    marginHorizontal: -20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: palette.GREY2,
    paddingHorizontal: 20,
  },
  rowLabel: {
    ...typography.semiheader14,
    color: palette.GREY2,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowValue: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  signOutButton: {
    backgroundColor: palette.TEXT_COLOR,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  signOutText: {
    ...typography.semiheader16,
    color: palette.WHITE,
  },
  deleteButton: {
    alignItems: "center",
    paddingVertical: 16,
  },
  deleteText: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
});
