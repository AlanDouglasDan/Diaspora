import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    left: 16,
    top: 16,
    padding: 4,
    zIndex: 2,
  },
  avatarContainer: {
    position: "relative",
    marginTop: 24,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  flagContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: palette.WHITE,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flagText: {
    fontSize: 16,
  },
  title: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  upgradeButton: {
    width: "100%",
  },
  maybeLaterButton: {
    marginTop: 16,
    padding: 8,
  },
  maybeLaterText: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
});
