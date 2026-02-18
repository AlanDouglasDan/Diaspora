import { StyleSheet } from "react-native";
import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerTitle: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    position: "absolute",
    top: 12,
    right: 4,
    backgroundColor: palette.WHITE,
    borderRadius: 32,
    padding: 6,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: -16,
  },
  progressText: {
    color: palette.WHITE,
    ...typography.text16,
  },
  userName: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    marginTop: 12,
  },
  tabContainer: {
    marginTop: 16,
  },
  tabContentContainer: {
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
  safetyOption: {
    backgroundColor: palette.WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  text16: {
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
});
