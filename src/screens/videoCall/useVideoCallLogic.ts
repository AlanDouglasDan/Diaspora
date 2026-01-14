import { useState, useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { CameraType } from "expo-camera";
import type { Call } from "@stream-io/video-react-native-sdk";

import { useStreamVideo, useStreamChat } from "@/src/providers";

import type { VideoCallScreenProps } from "./VideoCall.types";

export const useVideoCallLogic = (props: VideoCallScreenProps) => {
  const { navigation, route } = props;
  const { recipientId, recipientName, recipientAvatar } = route.params;

  const { startCall, endCall } = useStreamVideo();
  const { sendCallMessage } = useStreamChat();

  const [call, setCall] = useState<Call | null>(null);
  const [facing, setFacing] = useState<CameraType>("front");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [callStatus, setCallStatus] = useState<string>("Connecting...");

  const callStartTimeRef = useRef<number | null>(null);

  // Initialize the call when the screen mounts
  useEffect(() => {
    let isMounted = true;

    const initializeCall = async () => {
      try {
        setIsConnecting(true);
        setCallStatus("Connecting...");

        const newCall = await startCall(recipientId, true); // true = video call

        if (!isMounted) return;

        if (newCall) {
          setCall(newCall);
          setCallStatus("Connected");
          setIsConnecting(false);
          callStartTimeRef.current = Date.now();

          // Enable camera for video call
          await newCall.camera.enable();

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
          Alert.alert("Error", "Failed to start video call. Please try again.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error starting video call:", error);
        if (isMounted) {
          Alert.alert("Error", "Failed to start video call. Please try again.");
          navigation.goBack();
        }
      }
    };

    initializeCall();

    return () => {
      isMounted = false;
    };
  }, [recipientId, recipientName, startCall, navigation]);

  const toggleCameraFacing = useCallback(async () => {
    if (call) {
      try {
        await call.camera.flip();
        setFacing((current) => (current === "front" ? "back" : "front"));
      } catch (error) {
        console.error("Error flipping camera:", error);
      }
    }
  }, [call]);

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
        await sendCallMessage(recipientId, "video", durationSeconds);
      }
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      navigation.goBack();
    }
  }, [endCall, navigation, recipientId, sendCallMessage]);

  const handleReport = useCallback(() => {
    Alert.alert("Report User", "Are you sure you want to report this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Report",
        style: "destructive",
        onPress: () => {
          // TODO: Implement report API call
          console.log("User reported");
        },
      },
    ]);
  }, []);

  return {
    recipientName,
    recipientAvatar,
    call,
    facing,
    isMuted,
    isVideoOff,
    isConnecting,
    callStatus,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
    handleReport,
  };
};
