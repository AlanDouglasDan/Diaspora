import { Platform, StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  headerSection: {
    // paddingHorizontal: 20,
  },
  progressBar: {
    marginTop: 16,
  },
  title: {
    ...typography.header32,
    color: palette.BLACK,
    marginTop: 32,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginTop: 12,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 54,
    paddingHorizontal: 20,
  },
  interestChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.WHITE,
    borderWidth: 1,
    borderColor: `${palette.GREY2}50`,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  interestChipSelected: {
    borderColor: palette.RED,
    backgroundColor: `${palette.RED2}20`,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  interestLabelSelected: {
    color: palette.RED,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 24
  },
  skipText: {
    ...typography.text16,
    color: palette.TEXT_COLOR,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    ...typography.text16,
    color: palette.TEXT_COLOR,
    marginTop: 16,
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
