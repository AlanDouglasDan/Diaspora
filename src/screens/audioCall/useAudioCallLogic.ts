import { useState, useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";
import type { Call } from "@stream-io/video-react-native-sdk";

import { useStreamVideo, useStreamChat } from "@/src/providers";

import type { AudioCallScreenProps } from "./AudioCall.types";

export const useAudioCallLogic = (props: AudioCallScreenProps) => {
  const { navigation, route } = props;
  const { recipientId, recipientName, recipientAvatar } = route.params;

  const { startCall, endCall, activeCall } = useStreamVideo();
  const { sendCallMessage } = useStreamChat();

  const [call, setCall] = useState<Call | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [callStatus, setCallStatus] = useState<string>("Calling...");

  const callStartTimeRef = useRef<number | null>(null);

  // Initialize the call when the screen mounts
  useEffect(() => {
    let isMounted = true;

    const initializeCall = async () => {
      try {
        setIsConnecting(true);
        setCallStatus("Calling...");

        const newCall = await startCall(recipientId, false); // false = audio call

        if (!isMounted) return;

        if (newCall) {
          setCall(newCall);
          setCallStatus("Connected");
          setIsConnecting(false);
          callStartTimeRef.current = Date.now();

          // Disable camera for audio call
          await newCall.camera.disable();

          // Listen for call state changes
          newCall.on("call.ended", () => {
            if (isMounted) {
              navigation.goBack();
            }
          });

          newCall.on("call.rejected", () => {
            if (isMounted) {
              Alert.alert(
                "Call Declined",
                `${recipientName} declined the call`
              );
              navigation.goBack();
            }
          });
        } else {
          setCallStatus("Failed to connect");
          Alert.alert("Error", "Failed to start call. Please try again.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error starting audio call:", error);
        if (isMounted) {
          Alert.alert("Error", "Failed to start call. Please try again.");
          navigation.goBack();
        }
      }
    };

    initializeCall();

    return () => {
      isMounted = false;
    };
  }, [recipientId, recipientName, startCall, navigation]);

  const toggleCameraFacing = useCallback(() => {
    // No-op for audio call
  }, []);

  const toggleMute = useCallback(async () => {
    if (call) {
      try {
        if (isMuted) {
          await call.microphone.enable();
        } else {
          await call.microphone.disable();
        }
        setIsMuted((current) => !current);
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    }
  }, [call, isMuted]);

  const toggleVideo = useCallback(async () => {
    if (call) {
      try {
        if (isVideoOff) {
          await call.camera.enable();
        } else {
          await call.camera.disable();
        }
        setIsVideoOff((current) => !current);
      } catch (error) {
        console.error("Error toggling video:", error);
      }
    }
  }, [call, isVideoOff]);

  const handleEndCall = useCallback(async () => {
    try {
      // Calculate call duration
      const durationSeconds = callStartTimeRef.current
        ? Math.floor((Date.now() - callStartTimeRef.current) / 1000)
        : 0;

      await endCall();

      // Send call message to the channel if call was connected
      if (durationSeconds > 0) {
        await sendCallMessage(recipientId, "voice", durationSeconds);
      }
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      navigation.goBack();
    }
  }, [endCall, navigation, recipientId, sendCallMessage]);

  return {
    recipientName,
    recipientAvatar,
    isMuted,
    isVideoOff,
    isConnecting,
    callStatus,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
  };
};
