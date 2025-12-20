import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  callingContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 44,
  },
  callingText: {
    ...typography.text14,
    color: palette.WHITE,
    marginBottom: 16,
    textAlign: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: palette.WHITE,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginBottom: 44,
    borderRadius: 40,
    backgroundColor: `${palette.WHITE}20`,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${palette.WHITE}30`,
  },
  endCallButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.RED,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
