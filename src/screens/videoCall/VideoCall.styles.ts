import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.BLACK,
  },
  remoteVideo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  durationBadge: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: `${palette.BLACK}60`,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  durationText: {
    ...typography.text14,
    color: palette.WHITE,
    textAlign: "center",
  },
  localVideoContainer: {
    position: "absolute",
    bottom: 140,
    right: 20,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: palette.WHITE,
  },
  localVideo: {
    flex: 1,
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
  connectingContainer: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  connectingAvatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: `${palette.WHITE}40`,
    overflow: "hidden",
    marginBottom: 16,
  },
  connectingAvatar: {
    width: "100%",
    height: "100%",
  },
  connectingName: {
    ...typography.header20,
    color: palette.WHITE,
    marginBottom: 8,
    textAlign: "center",
  },
  connectingIndicator: {
    marginBottom: 8,
  },
  connectingText: {
    ...typography.text14,
    color: `${palette.WHITE}CC`,
    textAlign: "center",
  },
  waitingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  waitingText: {
    ...typography.text16,
    color: palette.WHITE,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
