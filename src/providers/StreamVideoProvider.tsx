import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import {
  StreamVideo,
  StreamVideoClient,
  User as StreamUser,
  Call,
  useCalls,
} from "@stream-io/video-react-native-sdk";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetStreamToken, useGetProfile } from "@/src/api";
import { useAppSelector } from "@/src/store";
import { requestNotificationPermission } from "@/src/core/requestNotificationPermission";
import { navigate } from "@/src/navigation/utils";

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
  const reduxUser = useAppSelector((state) => state.user.data);

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const hasConnectedRef = useRef(false);

  // Initialize and connect to Stream Video
  useEffect(() => {
    if (!isSignedIn || !clerkUser?.id) {
      return;
    }

    // During signup flow, the backend user may not exist yet.
    // useLoadingLogic is responsible for fetching and storing the backend user in Redux.
    if (!reduxUser?.id) {
      return;
    }

    // Prevent duplicate connections
    if (hasConnectedRef.current || isConnecting || isConnected) {
      return;
    }

    let videoClient: StreamVideoClient | null = null;
    let isMounted = true;

    const connectUser = async () => {
      hasConnectedRef.current = true;
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

        // Initialize Stream Video client
        const apiKey = tokenData.apiKey;

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
  }, [isSignedIn, clerkUser?.id, reduxUser?.id, getStreamToken, getProfile]);

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

// RingingCalls component to watch for incoming calls only.
// Outgoing calls are handled by the custom AudioCall/VideoCall screens.
// For incoming calls, we navigate to the custom screen instead of using Stream's default UI.
export const RingingCalls: React.FC = () => {
  const { user: clerkUser } = useUser();
  const calls = useCalls().filter((c) => c.ringing);
  const handledCallIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!clerkUser?.id || calls.length === 0) return;

    const ringingCall = calls[0];
    const callId = ringingCall.id;

    // Skip if we already handled this call
    if (handledCallIds.current.has(callId)) return;

    // Check if this is an incoming call (created by someone else)
    const createdByUserId = ringingCall.state.createdBy?.id;
    const isIncomingCall = createdByUserId !== clerkUser.id;

    if (!isIncomingCall) {
      // Outgoing call — already handled by custom AudioCall/VideoCall screen.
      // Mark as handled so we don't re-process.
      handledCallIds.current.add(callId);
      return;
    }

    // Incoming call — navigate to IncomingCall screen for accept/decline
    handledCallIds.current.add(callId);

    const isVideoCall = ringingCall.state.custom?.isVideoCall === true;
    const caller = ringingCall.state.createdBy;
    const callerName = caller?.name || "Unknown";
    const callerImage = caller?.image || null;

    navigate("IncomingCall", {
      recipientId: caller?.id || "",
      recipientName: callerName,
      recipientAvatar: callerImage ? { uri: callerImage } : null,
      isVideoCall,
    });
  }, [calls, clerkUser?.id]);

  // Clean up handled call IDs when calls are no longer ringing
  useEffect(() => {
    const activeCallIds = new Set(calls.map((c) => c.id));
    handledCallIds.current.forEach((id) => {
      if (!activeCallIds.has(id)) {
        handledCallIds.current.delete(id);
      }
    });
  }, [calls]);

  // No UI rendered — custom screens handle all call UI
  return null;
};

export default StreamVideoProvider;
