import { useCallback, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { useStreamChat } from "@/src/providers";
import type { MatchResultScreenProps } from "./MatchResult.types";

export const useMatchResultLogic = (props: MatchResultScreenProps) => {
  const { navigation, route } = props;
  const { userId, userName, userImage } = route.params;

  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const { startChat, isConnected } = useStreamChat();

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToMessages = useCallback(() => {
    setShowSuccessNotification(false);
    // Navigate to MainTabs with Messages tab selected
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "MainTabs",
            state: {
              routes: [{ name: "Messages" }],
              index: 2,
            },
          },
        ],
      }),
    );
  }, [navigation]);

  const handleSend = useCallback(async () => {
    if (!message.trim() || isSending) return;

    if (!isConnected) {
      Toast.show({
        type: "error",
        text1: "Connection Error",
        text2: "Please wait for chat to connect",
      });
      return;
    }

    setIsSending(true);
    try {
      const channel = await startChat(userId, message.trim());
      if (channel) {
        // Show success notification then navigate to Messages
        setShowSuccessNotification(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to send",
          text2: "Please try again",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to send",
        text2: "Please try again",
      });
    } finally {
      setIsSending(false);
    }
  }, [message, isSending, isConnected, startChat, userId]);

  const handleSuggestionPress = useCallback((suggestion: string) => {
    setMessage(suggestion);
  }, []);

  return {
    message,
    setMessage,
    handleClose,
    handleSend,
    handleSuggestionPress,
    userName,
    userImage,
    isSending,
    showSuccessNotification,
    navigateToMessages,
  };
};
