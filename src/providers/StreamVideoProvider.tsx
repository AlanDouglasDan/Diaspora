import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { StyleSheet } from "react-native";
import {
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
  Call,
  useCalls,
  StreamCall,
  RingingCallContent,
} from "@stream-io/video-react-native-sdk";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetStreamToken, useGetProfile, useGetUser } from "@/src/api";
import { requestNotificationPermission } from "@/src/core/requestNotificationPermission";

interface StreamVideoContextType {
  client: StreamVideoClient | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  activeCall: Call | null;
  startCall: (
    recipientId: string,
    isVideoCall: boolean,
  ) => Promise<Call | null>;
  joinCall: (callId: string, callType: string) => Promise<Call | null>;
  endCall: () => Promise<void>;
}

const StreamVideoContext = createContext<StreamVideoContextType>({
  client: null,
  isConnected: false,
  isConnecting: false,
  connectionError: null,
  activeCall: null,
  startCall: async () => null,
  joinCall: async () => null,
  endCall: async () => {},
});

export const useStreamVideo = () => useContext(StreamVideoContext);

interface StreamVideoProviderProps {
  children: ReactNode;
}

export const StreamVideoProvider: React.FC<StreamVideoProviderProps> = ({
  children,
}) => {
  const { user: clerkUser, isSignedIn } = useUser();
  const { getStreamToken } = useGetStreamToken();
  const { getProfile } = useGetProfile();
  const { getUser } = useGetUser();

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);

  // Initialize and connect to Stream Video
  useEffect(() => {
    if (!isSignedIn || !clerkUser?.id) {
      return;
    }

    let videoClient: StreamVideoClient | null = null;
    let isMounted = true;

    const connectUser = async () => {
      setIsConnecting(true);
      setConnectionError(null);

      try {
        // First check if user exists in backend (skip during signup flow)
        let userData;
        try {
          userData = await getUser(clerkUser.id);
        } catch (userError: any) {
          // User doesn't exist in backend yet (signup flow), skip connection
          console.log(
            "⏳ User not found in backend, skipping Stream Video connection (signup flow)",
          );
          setIsConnecting(false);
          return;
        }

        if (!userData || !isMounted) {
          // User doesn't exist, skip connection
          setIsConnecting(false);
          return;
        }

        // Get Stream token from backend
        const tokenData = await getStreamToken(clerkUser.id);

        if (!tokenData || !isMounted) {
          throw new Error("Failed to get stream token");
        }

        // Fetch fresh profile data
        const profileData = await getProfile(clerkUser.id);

        // Initialize Stream Video client
        const apiKey = tokenData.apiKey;

        const userName =
          profileData?.user?.name ||
          clerkUser.fullName ||
          clerkUser.firstName ||
          "User";
        const userImage = profileData?.images?.[0] || clerkUser.imageUrl;

        const user: StreamUser = {
          id: clerkUser.id,
          name: userName,
          image: userImage,
        };

        // Use getOrCreateInstance to reuse client and preserve call states when app is in background
        videoClient = StreamVideoClient.getOrCreateInstance({
          apiKey,
          user,
          token: tokenData.token,
        });

        // Store user info in AsyncStorage for push notifications when app is in background
        await AsyncStorage.setItem("@userId", clerkUser.id);
        await AsyncStorage.setItem("@userName", userName);

        // Request notification permissions for push notifications
        await requestNotificationPermission();

        if (isMounted) {
          setClient(videoClient);
          setIsConnected(true);
          console.log("✅ Stream Video connected successfully");
        }
      } catch (error: any) {
        console.error("❌ Stream Video connection error:", error);
        if (isMounted) {
          setConnectionError(error?.message || "Failed to connect to video");
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
      if (videoClient) {
        videoClient.disconnectUser().catch(() => {
          // Silently handle disconnect errors
        });
      }
    };
  }, [isSignedIn, clerkUser?.id, getStreamToken, getProfile, getUser]);

  // Start a call with another user
  const startCall = useCallback(
    async (recipientId: string, isVideoCall: boolean): Promise<Call | null> => {
      if (!client || !clerkUser?.id) {
        console.error("Video client not connected or user not authenticated");
        return null;
      }

      try {
        // Create a unique call ID based on both user IDs
        const memberIds = [clerkUser.id, recipientId].sort();
        const callId = `call_${memberIds[0].slice(0, 8)}_${memberIds[1].slice(0, 8)}_${Date.now()}`;

        // Use 'default' call type for both audio and video calls
        // Note: 'audio_room' is for live broadcast rooms and doesn't support ringing
        // For 1:1 calls with ringing, always use 'default' and control camera separately
        const call = client.call("default", callId);

        // Create the call with members
        await call.getOrCreate({
          ring: true,
          data: {
            members: [{ user_id: clerkUser.id }, { user_id: recipientId }],
            custom: {
              isVideoCall: isVideoCall,
            },
          },
        });

        // Join the call
        await call.join({ create: true });

        setActiveCall(call);
        console.log("✅ Call started successfully:", callId);

        return call;
      } catch (error: any) {
        console.error("❌ Error starting call:", error);
        return null;
      }
    },
    [client, clerkUser?.id],
  );

  // Join an existing call
  const joinCall = useCallback(
    async (
      callId: string,
      callType: string = "default",
    ): Promise<Call | null> => {
      if (!client) {
        console.error("Video client not connected");
        return null;
      }

      try {
        const call = client.call(callType, callId);
        await call.join();

        setActiveCall(call);
        console.log("✅ Joined call successfully:", callId);

        return call;
      } catch (error: any) {
        console.error("❌ Error joining call:", error);
        return null;
      }
    },
    [client],
  );

  // End the active call for all participants
  const endCall = useCallback(async () => {
    if (activeCall) {
      try {
        // Use endCall() instead of leave() to end the call for all participants
        await activeCall.endCall();
        setActiveCall(null);
        console.log("✅ Call ended successfully for all participants");
      } catch (error) {
        console.error("❌ Error ending call:", error);
        // Still clear the active call
        setActiveCall(null);
      }
    }
  }, [activeCall]);

  const contextValue = useMemo(
    () => ({
      client,
      isConnected,
      isConnecting,
      connectionError,
      activeCall,
      startCall,
      joinCall,
      endCall,
    }),
    [
      client,
      isConnected,
      isConnecting,
      connectionError,
      activeCall,
      startCall,
      joinCall,
      endCall,
    ],
  );

  // Wrap children with StreamVideo provider if client is ready
  if (!client) {
    return (
      <StreamVideoContext.Provider value={contextValue}>
        {children}
      </StreamVideoContext.Provider>
    );
  }

  return (
    <StreamVideoContext.Provider value={contextValue}>
      <StreamVideo client={client}>
        {children}
        {/* Watch for incoming/outgoing ringing calls */}
        <RingingCalls />
      </StreamVideo>
    </StreamVideoContext.Provider>
  );
};

// RingingCalls component to watch for incoming/outgoing calls
// This should be rendered at the root level of the app
export const RingingCalls: React.FC = () => {
  // Collect all ringing calls managed by the SDK
  const calls = useCalls().filter((c) => c.ringing);

  // For simplicity, we only take the first one but
  // there could be multiple calls ringing at the same time
  const ringingCall = calls[0];

  if (!ringingCall) return null;

  return (
    <StreamCall call={ringingCall}>
      <SafeAreaView style={ringingStyles.container}>
        <RingingCallContent />
      </SafeAreaView>
    </StreamCall>
  );
};

const ringingStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
});

export default StreamVideoProvider;
