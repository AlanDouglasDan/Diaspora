import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    width: 130,
    alignItems: "center",
    marginHorizontal: 16,
  },
  headerTitle: {
    ...typography.semiheader12,
    color: palette.RED,
    marginBottom: 4,
  },
  headerProgress: {
    width: "100%",
    borderRadius: 4,
    height: 4,
  },
  previewButton: {
    ...typography.semiheader16,
    color: palette.RED,
  },
  photosGrid: {
    marginBottom: 24,
  },
  userName: {
    ...typography.header20,
    color: palette.TEXT_COLOR,
  },
  semiheader14: {
    ...typography.semiheader14,
    color: palette.TEXT_COLOR,
  },
  flexedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 6,
  },
  sectionContainer: {
    marginTop: 16,
    backgroundColor: `${palette.RED2}15`,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: -20,
  },
  sectionContent: {
    marginTop: 12,
  },
  sectionTitle: {
    ...typography.header16,
    color: palette.TEXT_COLOR,
  },
  sectionEdit: {
    ...typography.text12,
    color: palette.GREY2,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  fieldLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fieldIcon: {
    width: 24,
    marginRight: 8,
  },
  fieldLabelContainer: {
    flex: 1,
  },
  fieldLabel: {
    ...typography.text14,
    color: palette.TEXT_COLOR,
  },
  fieldSubLabel: {
    ...typography.text10,
    color: `${palette.GREY2}70`,
  },
  fieldValue: {
    ...typography.text12,
    color: palette.GREY2,
  },
  fieldChevron: {
    marginLeft: 8,
  },
  bioInput: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
  },
  bioCounter: {
    ...typography.text12,
    color: palette.GREY2,
    textAlign: "right",
    marginTop: 4,
  },
  verifySection: {
    marginTop: 16,
    backgroundColor: `${palette.RED2}15`,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: -20,
  },
  verifyTitle: {
    ...typography.semiheader14,
    color: palette.BLACK,
    marginBottom: 8,
  },
  verifyDescription: {
    ...typography.text12,
    color: palette.GREY2,
    marginBottom: 16,
  },
  verifyButton: {
    marginVertical: 8,
  },
});
