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
  recipientName: {
    ...typography.header20,
    color: palette.WHITE,
    marginBottom: 4,
    textAlign: "center",
  },
  connectingIndicator: {
    marginBottom: 8,
  },
  callingText: {
    ...typography.text14,
    color: `${palette.WHITE}CC`,
    marginBottom: 24,
    textAlign: "center",
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: `${palette.WHITE}40`,
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
    gap: 20,
    paddingVertical: 16,
    paddingHorizontal: 28,
    marginHorizontal: 20,
    marginBottom: 50,
    borderRadius: 40,
    backgroundColor: `${palette.WHITE}15`,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${palette.WHITE}25`,
  },
  controlButtonActive: {
    backgroundColor: `${palette.WHITE}50`,
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
