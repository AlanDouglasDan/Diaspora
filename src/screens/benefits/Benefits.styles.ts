import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    alignItems: "center",
    paddingTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  title: {
    ...typography.header22,
    color: palette.WHITE,
    textAlign: "center",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    height: 32,
    width: 200,
  },
  contentCard: {
    flex: 1,
    backgroundColor: palette.WHITE,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  planDescription: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
    textAlign: "center",
    marginBottom: 20,
  },
  featuresList: {
    flex: 1,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  featureIconContainer: {
    width: 30,
    height: 30,
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
  continueButton: {
    marginTop: 24,
  },
});
