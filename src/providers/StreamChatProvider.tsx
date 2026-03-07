import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { StreamChat, Channel as ChannelType } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useUser } from "@clerk/clerk-expo";
import { useGetStreamToken, clearStreamToken, useGetProfile } from "@/src/api";
import { useAppSelector } from "@/src/store";

export type CallType = "voice" | "video";

interface StreamChatContextType {
  client: StreamChat | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  startChat: (
    recipientId: string,
    initialMessage?: string,
  ) => Promise<ChannelType | null>;
  sendLoveLetter: (recipientId: string, message: string) => Promise<boolean>;
  sendCallMessage: (
    recipientId: string,
    callType: CallType,
    durationSeconds: number,
  ) => Promise<boolean>;
  disconnectUser: () => Promise<void>;
}

const StreamChatContext = createContext<StreamChatContextType>({
  client: null,
  isConnected: false,
  isConnecting: false,
  connectionError: null,
  startChat: async () => null,
  sendLoveLetter: async () => false,
  sendCallMessage: async () => false,
  disconnectUser: async () => {},
});

export const useStreamChat = () => useContext(StreamChatContext);

interface StreamChatProviderProps {
  children: ReactNode;
}

export const StreamChatProvider: React.FC<StreamChatProviderProps> = ({
  children,
}) => {
  const { user: clerkUser, isSignedIn } = useUser();
  const { getStreamToken } = useGetStreamToken();
  const { getProfile } = useGetProfile();
  const reduxUser = useAppSelector((state) => state.user.data);

  const [client, setClient] = useState<StreamChat | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Initialize and connect to Stream Chat
  useEffect(() => {
    if (!isSignedIn || !clerkUser?.id) {
      return;
    }

    // During signup flow, the backend user may not exist yet.
    // useLoadingLogic is responsible for fetching and storing the backend user in Redux.
    if (!reduxUser?.id) {
      return;
    }

    let chatClient: StreamChat | null = null;
    let isMounted = true;

    const connectUser = async () => {
      setIsConnecting(true);
      setConnectionError(null);

      try {
        // Get Stream token from backend
        const tokenData = await getStreamToken(clerkUser.id);

        if (!tokenData || !isMounted) {
          throw new Error("Failed to get stream token");
        }

        // Fetch fresh profile data
        const profileData = await getProfile(clerkUser.id);

        // Initialize Stream Chat client
        const apiKey = tokenData.apiKey;
        chatClient = StreamChat.getInstance(apiKey);

        // Connect user to Stream
        const userName =
          profileData?.user?.name ||
          clerkUser.fullName ||
          clerkUser.firstName ||
          "User";
        const firstImage = profileData?.images?.[0];
        const userImage =
          (typeof firstImage === "string"
            ? firstImage
            : firstImage?.imageUrl) || clerkUser.imageUrl;

        const res = await chatClient.connectUser(
          {
            id: clerkUser.id!,
            name: userName,
            image: userImage,
          },
          tokenData.token,
        );

        if (isMounted) {
          setClient(chatClient);
          setIsConnected(true);
          console.log("✅ Stream Chat connected successfully");
        }
      } catch (error: any) {
        console.error("❌ Stream Chat connection error:", error);
        if (isMounted) {
          setConnectionError(error?.message || "Failed to connect to chat");
          setIsConnected(false);
        }
      } finally {
        if (isMounted) {
          setIsConnecting(false);
        }
      }
    };

    connectUser();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (chatClient) {
        // Use setTimeout to defer disconnection and avoid WebSocket race conditions
        setTimeout(() => {
          try {
            chatClient?.disconnectUser().catch(() => {
              // Silently handle disconnect errors to prevent crashes
            });
          } catch {
            // Silently handle any synchronous errors
          }
        }, 0);
      }
    };
  }, [isSignedIn, clerkUser?.id, reduxUser?.id, getStreamToken, getProfile]);

  // Disconnect user
  const disconnectUser = useCallback(async () => {
    if (client) {
      try {
        await client.disconnectUser();
        await clearStreamToken();
        setClient(null);
        setIsConnected(false);
        console.log("✅ Stream Chat disconnected");
      } catch (error) {
        console.error("❌ Error disconnecting from Stream Chat:", error);
      }
    }
  }, [client]);

  // Start a chat with another user
  const startChat = useCallback(
    async (
      recipientId: string,
      initialMessage?: string,
    ): Promise<ChannelType | null> => {
      if (!client || !clerkUser?.id) {
        console.error("Chat client not connected or user not authenticated");
        return null;
      }

      try {
        // Sort member IDs to ensure consistent channel ID regardless of who initiates
        const memberIds = [clerkUser.id, recipientId].sort();

        // Create a deterministic channel ID using sorted member IDs
        // This ensures the same channel is used regardless of who starts the chat
        const channelId = `dm_${memberIds[0].slice(0, 12)}_${memberIds[1].slice(
          0,
          12,
        )}`;

        // First, try to query for an existing channel between these users
        const existingChannels = await client.queryChannels({
          type: "messaging",
          members: { $eq: memberIds },
        });

        let channel: ChannelType;

        if (existingChannels.length > 0) {
          // Use existing channel
          channel = existingChannels[0];
          console.log("✅ Using existing channel:", channel.id);
        } else {
          // Create new channel with deterministic ID
          channel = client.channel("messaging", channelId, {
            members: memberIds,
          });
          console.log("✅ Creating new channel:", channelId);
        }

        // Watch the channel to receive updates
        await channel.watch();

        // Send initial message if provided
        if (initialMessage) {
          await channel.sendMessage({ text: initialMessage });
        }

        return channel;
      } catch (error: any) {
        console.error("❌ Error starting chat:", error);

        if (error?.message?.includes("Duplicate")) {
          console.log("Cannot chat with yourself");
        }

        return null;
      }
    },
    [client, clerkUser?.id],
  );

  // Send a love letter to another user
  const sendLoveLetter = useCallback(
    async (recipientId: string, message: string): Promise<boolean> => {
      if (!client || !clerkUser?.id || !message.trim()) {
        console.error("Cannot send love letter: missing requirements");
        return false;
      }

      try {
        // Get or create channel using startChat
        const channel = await startChat(recipientId);

        if (!channel) {
          console.error("Failed to get/create channel for love letter");
          return false;
        }

        // Send message with love letter metadata
        await channel.sendMessage({
          text: message.trim(),
          // @ts-ignore - Custom field for love letter identification
          isLoveLetter: true,
        } as any);

        console.log("✅ Love letter sent successfully");
        return true;
      } catch (error: any) {
        console.error("❌ Error sending love letter:", error);
        return false;
      }
    },
    [client, clerkUser?.id, startChat],
  );

  // Send a call message to another user (after a call ends)
  const sendCallMessage = useCallback(
    async (
      recipientId: string,
      callType: CallType,
      durationSeconds: number,
    ): Promise<boolean> => {
      if (!client || !clerkUser?.id) {
        console.error("Cannot send call message: missing requirements");
        return false;
      }

      try {
        // Get or create channel using startChat
        const channel = await startChat(recipientId);

        if (!channel) {
          console.error("Failed to get/create channel for call message");
          return false;
        }

        // Format duration for display
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = durationSeconds % 60;
        const durationText =
          minutes > 0
            ? `${minutes} min${seconds > 0 ? ` ${seconds} sec` : ""}`
            : `${seconds} sec`;

        // Send message with call metadata
        await channel.sendMessage({
          text: `${callType === "video" ? "Video" : "Voice"} call - ${durationText}`,
          // @ts-ignore - Custom fields for call identification
          isCall: true,
          callType: callType,
          callDuration: durationSeconds,
        } as any);

        console.log("✅ Call message sent successfully");
        return true;
      } catch (error: any) {
        console.error("❌ Error sending call message:", error);
        return false;
      }
    },
    [client, clerkUser?.id, startChat],
  );

  const contextValue = useMemo(
    () => ({
      client,
      isConnected,
      isConnecting,
      connectionError,
      startChat,
      sendLoveLetter,
      sendCallMessage,
      disconnectUser,
    }),
    [
      client,
      isConnected,
      isConnecting,
      connectionError,
      startChat,
      sendLoveLetter,
      sendCallMessage,
      disconnectUser,
    ],
  );

  // Don't render Chat component if client is not ready
  if (!client) {
    return (
      <StreamChatContext.Provider value={contextValue}>
        {children}
      </StreamChatContext.Provider>
    );
  }

  return (
    <StreamChatContext.Provider value={contextValue}>
      <OverlayProvider>
        <Chat client={client}>{children}</Chat>
      </OverlayProvider>
    </StreamChatContext.Provider>
  );
};

export default StreamChatProvider;
