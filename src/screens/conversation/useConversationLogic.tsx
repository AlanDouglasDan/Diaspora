import { useCallback, useState } from "react";
import { ActionSheetIOS, Alert, Platform } from "react-native";

import { images } from "core/images";

import type {
  ConversationScreenProps,
  ChatMessage,
} from "./Conversation.types";

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    text: "Hi",
    isMe: false,
    timestamp: new Date(),
  },
  {
    id: "2",
    text: "Hello, How are you doing?",
    isMe: true,
    timestamp: new Date(),
  },
  {
    id: "3",
    text: "I'm doing great, how about you?",
    isMe: false,
    timestamp: new Date(),
  },
  {
    id: "4",
    text: "Hello, How are you doing?",
    isMe: true,
    timestamp: new Date(),
  },
  {
    id: "5",
    text: "I'm doing great, how about you?\nhow about you?",
    isMe: false,
    timestamp: new Date(),
  },
  {
    id: "6",
    image: images.avatar2,
    isMe: false,
    timestamp: new Date(),
  },
];

export const useConversationLogic = (props: ConversationScreenProps) => {
  const { navigation, route } = props;
  const { recipientName, recipientAvatar, matchDate } = route.params;

  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCall = useCallback(() => {
    navigation.navigate("AudioCall", {
      recipientName,
      recipientAvatar,
    });
  }, [navigation, recipientName, recipientAvatar]);

  const handleVideoCall = useCallback(() => {
    navigation.navigate("VideoCall", {
      recipientName,
      recipientAvatar,
    });
  }, [navigation, recipientName, recipientAvatar]);

  const handleViewProfile = useCallback(() => {
    console.log("View profile pressed");
  }, []);

  const handleUnmatch = useCallback(() => {
    console.log("Unmatch pressed");
    navigation.goBack();
  }, [navigation]);

  const showBlockAndReportConfirm = useCallback(() => {
    const title = "Are you sure?";
    const message =
      "Unmatch to stop them from messaging and seeing your profile. Block and report if something's wrong or unsafe.";

    const destructiveLabel = `Block & report ${recipientName}`;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
          message,
          options: ["Yes, unmatch", destructiveLabel],
          destructiveButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            handleUnmatch();
          }
          if (buttonIndex === 1) {
            console.log("Block & report confirmed");
            navigation.goBack();
          }
        }
      );
      return;
    }

    Alert.alert(title, message, [
      {
        text: "Yes, unmatch",
        onPress: handleUnmatch,
      },
      {
        text: destructiveLabel,
        style: "destructive",
        onPress: () => {
          console.log("Block & report confirmed");
          navigation.goBack();
        },
      },
    ]);
  }, [handleUnmatch, navigation, recipientName]);

  const handleMore = useCallback(() => {
    const destructiveLabel = `Block & report ${recipientName}`;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["View profile", "Unmatch", destructiveLabel],
          destructiveButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            handleViewProfile();
          }

          if (buttonIndex === 1) {
            handleUnmatch();
          }

          if (buttonIndex === 2) {
            showBlockAndReportConfirm();
          }
        }
      );
      return;
    }

    Alert.alert("", "", [
      {
        text: "View profile",
        onPress: handleViewProfile,
      },
      {
        text: "Unmatch",
        onPress: handleUnmatch,
      },
      {
        text: destructiveLabel,
        style: "destructive",
        onPress: showBlockAndReportConfirm,
      },
    ]);
  }, [
    handleUnmatch,
    handleViewProfile,
    recipientName,
    showBlockAndReportConfirm,
  ]);

  const handleAddMedia = useCallback(() => {
    console.log("Add media pressed");
  }, []);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isMe: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  }, [inputText]);

  return {
    recipientName,
    recipientAvatar,
    matchDate,
    messages,
    inputText,
    setInputText,
    handleGoBack,
    handleCall,
    handleVideoCall,
    handleMore,
    handleAddMedia,
    handleSend,
  };
};
