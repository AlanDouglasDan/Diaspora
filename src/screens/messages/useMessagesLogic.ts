import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SheetManager } from "react-native-actions-sheet";
import { useUser } from "@clerk/clerk-expo";
import type { Channel as ChannelType } from "stream-chat";

import { useGetMatches } from "@/src/api";
import type { TItsAMatch } from "@/src/api/match/types";
import { images } from "core/images";
import type { RootStackParamList } from "navigation/RootNavigator";
import { useStreamChat } from "@/src/providers";

import type { Message } from "./Messages.types";

export const useMessagesLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user: clerkUser } = useUser();
  const { client, isConnected } = useStreamChat();

  const {
    data: matchesData,
    isLoading: isLoadingMatches,
    getMatches,
  } = useGetMatches();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch channels from Stream Chat
  const fetchChannels = useCallback(
    async (showLoading = true) => {
      if (!client || !isConnected || !clerkUser?.id) {
        setIsLoading(false);
        return;
      }

      if (showLoading) {
        setIsLoading(true);
      }

      try {
        // Query channels where the current user is a member
        const filter = {
          type: "messaging",
          members: { $in: [clerkUser.id] },
        };
        const sort = [{ last_message_at: -1 as const }];

        const channels = await client.queryChannels(filter, sort, {
          watch: true,
          state: true,
          limit: 30,
        });

        // Convert channels to Message format
        const channelMessages: Message[] = channels.map(
          (channel: ChannelType) => {
            // Get the other member (not the current user)
            const members = Object.values(channel.state.members);
            const otherMember = members.find((m) => m.user_id !== clerkUser.id);
            const otherUser = otherMember?.user;

            // Get last message
            const lastMessage =
              channel.state.messages[channel.state.messages.length - 1];

            // Check if the last message is a love letter or call
            const isLoveLetter = (lastMessage as any)?.isLoveLetter === true;
            const isCall = (lastMessage as any)?.isCall === true;
            const callType = (lastMessage as any)?.callType as
              | "voice"
              | "video"
              | undefined;

            let displayMessage = lastMessage?.text || "No messages yet";
            if (isLoveLetter) {
              displayMessage = "Love Letter 💌";
            } else if (isCall) {
              displayMessage =
                callType === "video" ? "Video call 📹" : "Voice call 📞";
            }

            return {
              id: channel.id || "",
              recipientId: otherUser?.id || "",
              name: otherUser?.name || "User",
              avatar: otherUser?.image
                ? { uri: otherUser.image }
                : images.avatar2,
              countryFlag: "🌍",
              lastMessage: displayMessage,
              isOnline: otherUser?.online || false,
            };
          }
        );

        setMessages(channelMessages);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [client, isConnected, clerkUser?.id]
  );

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchChannels(false);
    await getMatches(clerkUser?.id || "");
  }, [clerkUser?.id]);

  // Fetch channels on mount and listen for updates
  useEffect(() => {
    if (!client || !isConnected || !clerkUser?.id) {
      setIsLoading(false);
      return;
    }

    fetchChannels();

    // Listen for channel updates
    const handleChannelUpdated = () => {
      fetchChannels(false);
    };

    client.on("message.new", handleChannelUpdated);
    client.on("channel.updated", handleChannelUpdated);

    return () => {
      client.off("message.new", handleChannelUpdated);
      client.off("channel.updated", handleChannelUpdated);
    };
  }, [client, isConnected, clerkUser?.id, fetchChannels]);

  useEffect(() => {
    if (!clerkUser?.id) return;

    getMatches(clerkUser.id);
  }, [clerkUser?.id]);

  const handleMatchPress = useCallback(
    (match: TItsAMatch) => {
      navigation.navigate("Conversation", {
        recipientId: match.user.id,
        recipientName: match.user.displayName,
        recipientAvatar: match.images[0],
        matchDate: new Date(match.match.matchedAt).toLocaleDateString(),
      });
    },
    [navigation]
  );

  const handleMessagePress = useCallback(
    (message: Message) => {
      navigation.navigate("Conversation", {
        recipientId: message.recipientId || message.id,
        recipientName: message.name,
        recipientAvatar: message.avatar,
        matchDate: "",
      });
    },
    [navigation]
  );

  const handleLoveLettersPress = useCallback(() => {
    console.log("Love letters pressed");
  }, []);

  const handleGetSwiping = useCallback(() => {
    navigation.navigate("MainTabs", { screen: "Match" } as any);
  }, [navigation]);

  return {
    matches: matchesData || [],
    messages,
    isLoading: isLoading || isLoadingMatches,
    isRefreshing,
    handleRefresh,
    handleMatchPress,
    handleMessagePress,
    handleLoveLettersPress,
    handleGetSwiping,
  };
};
