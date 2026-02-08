import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import { useStreamChat } from "@/src/providers";
import type { RootStackParamList } from "../../navigation";
import type { SendLoveLetterScreenProps } from "./SendLoveLetter.types";

export const useSendLoveLetterLogic = (props: SendLoveLetterScreenProps) => {
  const { route } = props;
  const { userId, userName, userAge, userImages } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { sendLoveLetter, isConnected: isStreamConnected } = useStreamChat();

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSend = useCallback(async () => {
    if (!message.trim() || isSending) return;

    if (!isStreamConnected) {
      Toast.show({
        type: "error",
        text1: "Connection Error",
        text2: "Please wait for chat to connect",
      });
      return;
    }

    setIsSending(true);
    try {
      const success = await sendLoveLetter(userId, message);

      if (success) {
        setMessage("");
        // Navigate to Messages tab
        navigation.navigate("MainTabs", { screen: "Messages" } as any);
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
  }, [
    message,
    isSending,
    isStreamConnected,
    sendLoveLetter,
    userId,
    navigation,
  ]);

  return {
    userId,
    userName,
    userAge,
    userImages,
    message,
    setMessage,
    isSending,
    handleClose,
    handleSend,
  };
};
