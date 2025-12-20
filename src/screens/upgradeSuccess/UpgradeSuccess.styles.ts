import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingRight: 16,
    zIndex: 10,
  },
  heroImage: {
    width: 220,
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    ...typography.header22,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    ...typography.text14,
    color: palette.BLACK,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 24,
  },
  logoContainer: {
    backgroundColor: palette.RED,
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    height: 34,
    width: "100%",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureText: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    flex: 1,
  },
  seeAllButton: {
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  seeAllText: {
    ...typography.header14,
    color: palette.BLACK,
    textDecorationLine: "underline",
  },
  continueButton: {
    marginTop: "auto",
  },
});
