import { StyleSheet, Dimensions } from "react-native";

import { palette, typography } from "core/styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const TAB_BAR_HEIGHT = 80;
const HEADER_HEIGHT = 56;
const CARD_HEIGHT = SCREEN_HEIGHT - TAB_BAR_HEIGHT - HEADER_HEIGHT - 90;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 120,
    paddingBottom: 20,
  },
  swiperContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  swiperInnerContainer: {
    flex: 1,
  },
  swiperCard: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  cardImageTouchable: {
    width: "100%",
    height: "100%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flagEmoji: {
    fontSize: 55,
  },
  nameContainer: {
    flexDirection: "column",
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nameText: {
    ...typography.header20,
    color: palette.WHITE,
  },
  ageText: {
    ...typography.header20,
    color: palette.WHITE,
    fontWeight: "400",
  },
  verifiedIcon: {
    marginLeft: 2,
    backgroundColor: palette.BLUE,
    padding: 2,
    borderRadius: 50,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: `${palette.WHITE}CC`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  badgeText: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
  },
  scrollIndicator: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    height: 150,
    marginTop: "35%",
    borderWidth: 0.2,
    borderColor: palette.GREY,
  },
  scrollDot: {
    width: 4,
    height: "70%",
    backgroundColor: `${palette.BLACK}70`,
  },
  scrollDotActive: {
    height: "30%",
    backgroundColor: palette.WHITE,
  },
  bottomSection: {
    padding: 12,
    gap: 16,
  },
  onlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: `${palette.BLACK}90`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CD964",
  },
  offlineDot: {
    backgroundColor: "#8E8E93",
  },
  onlineText: {
    ...typography.text14,
    color: palette.WHITE,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  actionButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: palette.WHITE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLogo: {
    width: 100,
    height: 28,
  },
  headerButton: {
    paddingHorizontal: 16,
  },
  text14: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.GREY2,
    marginTop: 6,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
    marginBottom: 8,
  },
  sectionValue: {
    ...typography.semiheader16,
    color: palette.GREY2,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  basicTag: {
    backgroundColor: `${palette.PINK}30`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
  },
  galleryPhoto: {
    flex: 1,
    height: 500,
    width: SCREEN_WIDTH,
    marginHorizontal: -16,
    marginTop: 32,
    marginBottom: 12,
  },
  largePhoto: {
    width: "100%",
    height: 400,
    borderRadius: 12,
  },
  loveLetterContainer: {
    marginTop: 32,
    gap: 6,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  shareButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.RED3,
    borderRadius: 20,
  },
  shareButtonText: {
    ...typography.semiheader14,
    color: palette.RED,
    textDecorationLine: "underline",
  },
  text11: {
    ...typography.text11,
    color: palette.TEXT_COLOR,
  },
  footerButton: {
    alignItems: "center",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: palette.GREY,
  },
  footerButtonText: {
    ...typography.semiheader16,
    color: palette.BLACK,
  },
  loveLetterInput: {
    ...typography.semiheader16,
    color: palette.GREY2,
    borderWidth: 1,
    borderColor: palette.TEXT_COLOR,
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    paddingVertical: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 100,
    paddingBottom: 24,
  },
  emptyStateImageContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  emptyStateImage: {
    width: 280,
    height: 350,
  },
  emptyStateBottomSection: {
    width: "100%",
    alignItems: "center",
  },
  emptyStateMessage: {
    textAlign: "center",
    color: palette.GREY2,
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyStateButton: {
    width: "100%",
  },
  loadingStateMessage: {
    marginTop: 16,
    textAlign: "center",
  },
  loadingStateSubtext: {
    marginTop: 8,
    textAlign: "center",
    color: palette.GREY2,
  },
});

export { CARD_HEIGHT };
