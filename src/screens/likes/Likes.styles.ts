import { StyleSheet, Dimensions } from "react-native";

import { palette, typography } from "core/styles";

const { width } = Dimensions.get("window");
const GRID_GAP = 12;
const HORIZONTAL_PADDING = 20;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.25;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  tabNav: {
    marginTop: 8,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    ...typography.header22,
    color: palette.BLACK,
    textAlign: "center",
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginTop: 8,
    textAlign: "center",
  },
  listContent: {
    // paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: GRID_GAP,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  // Top section
  cardTopSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
  },
  cardTopLeft: {
    flex: 1,
    marginRight: 8,
  },
  cardUserName: {
    ...typography.semiheader14,
    color: palette.WHITE,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  recentlyActiveBadgeInline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  recentlyActiveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${palette.BLACK}70`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  greenDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: palette.YELLOW,
    marginRight: 4,
  },
  badgeText: {
    ...typography.text10,
    color: palette.WHITE,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Priority Aisles gradient icon (top-right, small, not pressable)
  priorityGradientIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  // Bottom section
  cardBottomSection: {
    padding: 10,
  },
  // Your Likes tab: icon at bottom-right
  likesBottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  superLikeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.RED,
    alignItems: "center",
    justifyContent: "center",
  },
  // Views tab: dislike + like space-between at bottom
  viewsBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dislikeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.RED,
    alignItems: "center",
    justifyContent: "center",
  },
  likeHeartIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  // Greyed out state for already-liked users
  greyedOutIcon: {
    backgroundColor: palette.GREY3,
  },
  // Loading state styles
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Empty state styles
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateImage: {
    width: 220,
    height: 220,
    marginBottom: 24,
  },
  emptyStateTitle: {
    ...typography.header20,
    color: palette.BLACK,
    textAlign: "center",
    marginBottom: 12,
  },
  emptyStateSubtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 32,
  },
  emptyScrollContent: {
    flexGrow: 1,
  },
});

export const CARD_WIDTH_EXPORT = CARD_WIDTH;
