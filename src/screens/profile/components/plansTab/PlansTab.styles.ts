import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: `${palette.RED2}20`,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
  },
  planItemsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  planItem: {
    backgroundColor: palette.WHITE,
    flex: 1,
    borderRadius: 16,
    paddingTop: 6,
    paddingBottom: 12,
    alignItems: "center",
  },
  planItemLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.BLACK,
    marginTop: 8,
  },
  planItemCount: {
    fontSize: 11,
    color: palette.TEXT_COLOR,
    marginTop: 2,
  },
  carouselContainer: {
    marginTop: 20,
  },
  carouselContentContainer: {
    paddingRight: 20,
    gap: 10,
  },
  subscriptionCard: {
    borderRadius: 24,
    padding: 20,
  },
  subscriptionLogo: {
    height: 32,
    width: 160,
    alignSelf: "center",
    marginBottom: 8,
  },
  subscriptionDescription: {
    ...typography.text12,
    color: palette.WHITE,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  featuresTable: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    marginTop: 16,
    padding: 16,
  },
  featuresHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  featureNameHeader: {
    flex: 2,
  },
  featureColumnHeader: {
    flex: 1,
    alignItems: "center",
  },
  featureColumnText: {
    ...typography.text12,
    color: palette.WHITE,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  featureName: {
    flex: 2,
    ...typography.text14,
    color: palette.WHITE,
  },
  featureColumn: {
    flex: 1,
    alignItems: "center",
  },
  viewAllFeatures: {
    alignItems: "center",
    marginTop: 12,
  },
  viewAllFeaturesText: {
    ...typography.text16,
    color: palette.WHITE,
    fontWeight: "600",
  },
  upgradeButton: {
    marginTop: 16,
  },
  text14: {
    ...typography.text14,
    color: palette.BLACK,
  }
});
