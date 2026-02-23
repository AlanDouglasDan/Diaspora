import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 24,
  },
  title: {
    ...typography.header28,
    color: palette.BLACK,
    paddingTop: 12,
    marginLeft: 16,
  },
  sectionTitle: {
    ...typography.semiheader14,
    color: palette.BLACK,
  },
  matchesContainer: {
    marginBottom: 32,
  },
  matchesList: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 6,
  },
  matchItem: {
    alignItems: "center",
    width: 80,
  },
  matchAvatarContainer: {
    position: "relative",
    marginBottom: 8,
  },
  matchAvatar: {
    width: 90,
    height: 110,
    borderRadius: 16,
  },
  matchFlagContainer: {
    position: "absolute",
    bottom: 0,
    left: 4,
    backgroundColor: palette.WHITE,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 99,
  },
  matchFlag: {
    fontSize: 12,
  },
  matchName: {
    ...typography.text14,
    color: palette.BLACK,
    textAlign: "center",
  },
  messagesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  loveLettersButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  loveLettersGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loveLettersText: {
    ...typography.semiheader12,
    color: palette.WHITE,
    marginRight: 4,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  messageAvatarContainer: {
    position: "relative",
    marginRight: 8,
  },
  messageAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  messageFlagContainer: {
    position: "absolute",
    bottom: -2,
    left: -2,
    backgroundColor: palette.WHITE,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageFlag: {
    fontSize: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageName: {
    ...typography.semiheader16,
    color: palette.BLACK,
  },
  premiumIcon: {
    marginLeft: 4,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CD964",
    marginLeft: 4,
  },
  messagePreview: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginTop: 2,
  },
  messageDivider: {
    marginLeft: 56,
  },
  messageDividerLine: {
    flex: 1,
    width: undefined,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emptyStateImageContainer: {
    flex: 1,
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
    ...typography.text14,
    textAlign: "center",
    color: palette.GREY2,
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyTitle: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  emptyButton: {
    width: "100%",
  },
});
