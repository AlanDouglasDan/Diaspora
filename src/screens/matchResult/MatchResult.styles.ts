import { StyleSheet, Dimensions } from "react-native";

import { palette, typography } from "core/styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  matchedImageContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  matchedImage: {
    width: 280,
    height: 120,
  },
  subtitle: {
    ...typography.semiheader16,
    color: palette.WHITE,
    textAlign: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.WHITE,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    ...typography.semiheader16,
    color: palette.TEXT_COLOR,
  },
  sendButton: {
    marginLeft: 12,
  },
  sendText: {
    ...typography.semiheader18,
    color: palette.TEXT_COLOR,
  },
  suggestionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  suggestionChip: {
    backgroundColor: `${palette.BLACK}1A`,
    borderWidth: 2,
    borderColor: palette.WHITE,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 28,
  },
  suggestionText: {
    ...typography.header18,
    color: palette.WHITE,
  },
});
