import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 24,
    marginBottom: 32,
    overflow: "hidden",
  },
  profileIconContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 40,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  roundButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  dislikeButton: {
    backgroundColor: palette.RED,
  },
  likeButton: {
    backgroundColor: palette.GREEN,
  },
  reportButton: {
    marginTop: 24,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reportText: {
    ...typography.text14,
    color: palette.GREY2,
  },
});
