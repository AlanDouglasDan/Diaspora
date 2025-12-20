import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.LIGHT_GREY,
  },
  headerLeft: {
    position: "absolute",
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  headerName: {
    ...typography.semiheader14,
    color: palette.BLACK,
  },
  headerRight: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  matchDateContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  matchDateText: {
    ...typography.text12,
    color: palette.TEXT_COLOR,
    textTransform: "uppercase",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageRow: {
    marginBottom: 8,
  },
  messageRowMe: {
    alignItems: "flex-end",
  },
  messageRowOther: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  messageBubbleMe: {
    backgroundColor: palette.GREY,
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: `${palette.RED}15`,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...typography.text14,
    color: palette.BLACK,
  },
  messageImage: {
    width: 200,
    height: 250,
    borderRadius: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: palette.LIGHT_GREY,
    gap: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.TEXT_COLOR,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    ...typography.text14,
    color: palette.BLACK,
    paddingVertical: 4,
  },
  sendButtonContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
