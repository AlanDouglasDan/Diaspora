import { StyleSheet, Dimensions } from "react-native";
import { palette, typography } from "core/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 80;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
  },
  closeButton: {
    left: 16,
    zIndex: 10,
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
  imageListContainer: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  userInfoContainer: {
    alignItems: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
  userNameText: {
    ...typography.header32,
    color: palette.TEXT_COLOR,
  },
  userAgeText: {
    ...typography.text28,
    color: palette.TEXT_COLOR,
  },
  loveLetterContainer: {
    marginTop: 32,
    gap: 6,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
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
  sectionTitle: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
    marginBottom: 8,
  },
});

export { IMAGE_WIDTH };
