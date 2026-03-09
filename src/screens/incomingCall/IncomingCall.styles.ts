import { StyleSheet, Dimensions } from "react-native";

import { palette, typography } from "core/styles";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: -60,
  },
  avatarRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: `${palette.RED}40`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
  },
  avatarPlaceholder: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: `${palette.PINK2}30`,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 48,
    fontWeight: "700",
    color: palette.RED,
  },
  callerName: {
    ...typography.header28,
    color: palette.BLACK,
    textAlign: "center",
    marginBottom: 8,
  },
  callTypeLabel: {
    ...typography.text16,
    color: palette.GREY2,
    textAlign: "center",
    marginBottom: 12,
  },
  pulseContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.RED,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    alignItems: "center",
    gap: 10,
  },
  declineButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF3B30",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  acceptButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#34C759",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonLabel: {
    ...typography.text14,
    color: palette.GREY2,
  },
});
