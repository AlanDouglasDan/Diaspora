import { StyleSheet, Dimensions } from "react-native";

import { palette, typography } from "core/styles";

const { width } = Dimensions.get("window");
const GRID_GAP = 12;
const GRID_PADDING = 20;
const PHOTO_WIDTH = (width - GRID_PADDING * 2 - GRID_GAP) / 2;

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
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 32,
    gap: GRID_GAP,
  },
  photoSlot: {
    width: PHOTO_WIDTH,
    height: PHOTO_WIDTH * 1.1,
    backgroundColor: palette.GREY,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  editButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.WHITE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addIcon: {
    color: palette.TEXT_COLOR,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  uploadingText: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    marginLeft: 8,
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const PHOTO_WIDTH_EXPORT = PHOTO_WIDTH;
