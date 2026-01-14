import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  progressBar: {
    marginTop: 16,
    marginHorizontal: -20,
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
    marginTop: 32,
    gap: 12,
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
