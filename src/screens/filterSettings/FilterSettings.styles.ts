import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    // paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerRight: {
    paddingRight: 8,
  },
  clearAllText: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
    marginTop: 16,
  },
  selectContainer: {
    marginTop: 16,
  },
  selectLabel: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
    marginBottom: 8,
  },
  countryPickerButton: {
    backgroundColor: palette.GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  countryPickerText: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  sliderContainer: {
    marginTop: 32,
    paddingHorizontal: 12,
  },
  cabinCrewSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: palette.GREY,
  },
  cabinCrewTitle: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    marginBottom: 8,
  },
  cabinCrewDescription: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    opacity: 0.7,
    marginBottom: 16,
    lineHeight: 20,
  },
  upgradeBadge: {
    alignSelf: "flex-start",
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginBottom: 12,
  },
  upgradeBadgeText: {
    ...typography.semiheader14,
    color: palette.WHITE,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.GREY,
  },
  toggleLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.GREY,
  },
  selectRowLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  selectRowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectRowValue: {
    ...typography.text14,
    color: palette.GREY2,
    marginRight: 4,
  },
  applyButton: {
    marginTop: 32,
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: palette.WHITE,
  },
  filterDropdown: {
    marginTop: 16,
  },
});
