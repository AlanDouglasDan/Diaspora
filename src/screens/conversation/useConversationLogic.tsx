import { useCallback, useState, useEffect, useRef } from "react";
import { ActionSheetIOS, Alert, Platform } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import type {
  Channel as ChannelType,
  MessageResponse,
  Event,
} from "stream-chat";

import { useStreamChat } from "@/src/providers";
import { useGetProfile } from "@/src/api";

import type {
  ConversationScreenProps,
  ChatMessage,
} from "./Conversation.types";

export const useConversationLogic = (props: ConversationScreenProps) => {
  const { navigation, route } = props;
  const { recipientId, recipientName, recipientAvatar, matchDate } =
    route.params;

  const { user: clerkUser } = useUser();
  const { client, startChat, isConnected } = useStreamChat();
  const { data: profileData, getProfile } = useGetProfile();

  // Fetch logged in user's profile for avatar
  useEffect(() => {
    if (clerkUser?.id) {
      getProfile(clerkUser.id);
    }
  }, [clerkUser?.id, getProfile]);

  // Get logged in user's avatar from profile data
  const myAvatar = profileData?.images?.[0]
    ? {
        uri:
          typeof profileData.images[0] === "string"
            ? profileData.images[0]
            : profileData.images[0]?.imageUrl,
      }
    : undefined;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const channelRef = useRef<ChannelType | null>(null);

  // Convert Stream message to ChatMessage format
  const convertMessage = useCallback(
    (msg: MessageResponse): ChatMessage => ({
      id: msg.id,
      text: msg.text,
      image: msg.attachments?.[0]?.image_url,
      isMe: msg.user?.id === clerkUser?.id,
      timestamp: new Date(msg.created_at || Date.now()),
      isLoveLetter: (msg as any)?.isLoveLetter === true,
      isCall: (msg as any)?.isCall === true,
      callType: (msg as any)?.callType as "voice" | "video" | undefined,
      callDuration: (msg as any)?.callDuration as number | undefined,
    }),
    [clerkUser?.id],
  );

  // Initialize channel and load messages
  useEffect(() => {
    if (!isConnected || !recipientId || !clerkUser?.id) {
      return;
    }

    let isMounted = true;

    const initializeChannel = async () => {
      setIsLoading(true);

      try {
        // Create or get existing channel
        const channel = await startChat(recipientId);

        if (!channel || !isMounted) {
          setIsLoading(false);
          return;
        }

        channelRef.current = channel;

        // Load existing messages
        const state = await channel.query({
          messages: { limit: 50 },
        });

        if (isMounted && state.messages) {
          const convertedMessages = state.messages.map(convertMessage);
          setMessages(convertedMessages);
        }

        // Listen for new messages
        const handleNewMessage = (event: Event) => {
          if (event.message && isMounted) {
            const newMessage = convertMessage(event.message as MessageResponse);
            setMessages((prev) => {
              // Avoid duplicates
              if (prev.some((m) => m.id === newMessage.id)) {
                return prev;
              }
              return [...prev, newMessage];
            });
          }
        };

        channel.on("message.new", handleNewMessage);

        // Cleanup listener on unmount
        return () => {
          channel.off("message.new", handleNewMessage);
        };
      } catch (error) {
        console.error("Error initializing channel:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const cleanup = initializeChannel();

    return () => {
      isMounted = false;
      cleanup?.then((cleanupFn) => cleanupFn?.());
    };
  }, [isConnected, recipientId, clerkUser?.id, startChat, convertMessage]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCall = useCallback(() => {
    navigation.navigate("AudioCall", {
      recipientId,
      recipientName,
      recipientAvatar,
    });
  }, [navigation, recipientId, recipientName, recipientAvatar]);

  const handleVideoCall = useCallback(() => {
    navigation.navigate("VideoCall", {
      recipientId,
      recipientName,
      recipientAvatar,
    });
  }, [navigation, recipientId, recipientName, recipientAvatar]);

  const handleViewProfile = useCallback(() => {
    const imageUri =
      typeof recipientAvatar === "object" && recipientAvatar?.uri
        ? recipientAvatar.uri
        : "";
    navigation.navigate("UserProfileView", {
      userId: recipientId,
      avatar: imageUri,
      userName: recipientName,
    });
  }, [navigation, recipientId, recipientAvatar, recipientName]);

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
        },
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
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["View profile", "Cancel"],
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            handleViewProfile();
          }
        },
      );
      return;
    }

    Alert.alert("", "", [
      {
        text: "View profile",
        onPress: handleViewProfile,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }, [handleViewProfile]);

  const handleAddMedia = useCallback(() => {
    console.log("Add media pressed");
  }, []);

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || !channelRef.current || isSending) return;

    setIsSending(true);
    const messageText = inputText.trim();
    setInputText("");

    try {
      await channelRef.current.sendMessage({
        text: messageText,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Restore input text on error
      setInputText(messageText);
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  }, [inputText, isSending]);

  return {
    recipientName,
    recipientAvatar,
    myAvatar,
    matchDate: matchDate || "",
    messages,
    inputText,
    setInputText,
    handleGoBack,
    handleCall,
    handleVideoCall,
    handleMore,
    handleAddMedia,
    handleSend,
    isLoading,
    isSending,
    isConnected,
  };
};
