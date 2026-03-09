import { useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { useCalls } from "@stream-io/video-react-native-sdk";
import { useUser } from "@clerk/clerk-expo";

import type { IncomingCallScreenProps } from "./IncomingCall.types";

export const useIncomingCallLogic = (props: IncomingCallScreenProps) => {
  const { navigation, route } = props;
  const { recipientId, recipientName, recipientAvatar, isVideoCall } =
    route.params;

  const { user: clerkUser } = useUser();
  const calls = useCalls().filter((c) => c.ringing);
  const hasHandledRef = useRef(false);

  // Find the ringing call from this caller
  const ringingCall = calls.find(
    (c) => c.state.createdBy?.id === recipientId,
  ) || calls[0];

  // Auto-dismiss if the caller cancels the call
  useEffect(() => {
    if (!ringingCall) {
      // Call was cancelled or ended before user acted
      if (hasHandledRef.current) return;
      navigation.goBack();
      return;
    }

    const handleEnded = () => {
      if (!hasHandledRef.current) {
        navigation.goBack();
      }
    };

    ringingCall.on("call.ended", handleEnded);

    return () => {
      ringingCall.off("call.ended", handleEnded);
    };
  }, [ringingCall, navigation]);

  const handleAccept = useCallback(async () => {
    if (hasHandledRef.current || !ringingCall) return;
    hasHandledRef.current = true;

    try {
      // Join/accept the ringing call
      await ringingCall.join();

      // Navigate to the appropriate call screen
      const screenName = isVideoCall ? "VideoCall" : "AudioCall";
      navigation.replace(screenName, {
        recipientId,
        recipientName,
        recipientAvatar,
        isIncoming: true,
      });
    } catch (error) {
      console.error("Error accepting call:", error);
      hasHandledRef.current = false;
      Alert.alert("Error", "Failed to accept the call. Please try again.");
    }
  }, [ringingCall, isVideoCall, navigation, recipientId, recipientName, recipientAvatar]);

  const handleDecline = useCallback(async () => {
    if (hasHandledRef.current || !ringingCall) return;
    hasHandledRef.current = true;

    try {
      await ringingCall.leave({ reject: true });
    } catch (error) {
      console.error("Error declining call:", error);
    } finally {
      navigation.goBack();
    }
  }, [ringingCall, navigation]);

  return {
    recipientName,
    recipientAvatar,
    isVideoCall,
    handleAccept,
    handleDecline,
  };
};
