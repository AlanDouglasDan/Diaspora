import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backButton: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImageContainer: {
    width: "100%",
    height: 420,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "transparent",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  nameText: {
    ...typography.header22,
    color: palette.WHITE,
  },
  sectionCard: {
    backgroundColor: palette.WHITE,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
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
  semiheader16: {
    ...typography.semiheader16,
    color: palette.GREY2,
    marginTop: 6,
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
  loveLetterContainer: {
    marginTop: 32,
    gap: 6,
    flexDirection: "row",
    alignItems: "flex-end",
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
  shareButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.RED3,
    borderRadius: 20,
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
});
