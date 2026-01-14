import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
    marginHorizontal: -20,
  },
  scrollContent: {
    paddingTop: 20,
  },
  pageTitle: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  yourInterestsSection: {
    backgroundColor: `${palette.RED2}15`,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  yourInterestsTitle: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
    marginBottom: 12,
  },
  selectedInterestsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categorySection: {
    backgroundColor: `${palette.RED2}15`,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  categoryTitle: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
    marginBottom: 12,
  },
  interestsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${palette.PINK}60`,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  interestChipSelected: {
    backgroundColor: `${palette.PINK}60`,
  },
  interestEmoji: {
    fontSize: 14,
  },
  interestLabel: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
  },
  interestIcon: {
    marginLeft: 2,
  },
  showMoreButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  showMoreText: {
    ...typography.text12,
    color: palette.GREY2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    ...typography.text14,
    color: palette.GREY2,
    marginTop: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: palette.WHITE,
  },
});
