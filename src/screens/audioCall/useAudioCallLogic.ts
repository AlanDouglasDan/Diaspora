import { useState, useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";
import type { Call } from "@stream-io/video-react-native-sdk";

import { useStreamVideo, useStreamChat } from "@/src/providers";

import type { AudioCallScreenProps } from "./AudioCall.types";

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const useAudioCallLogic = (props: AudioCallScreenProps) => {
  const { navigation, route } = props;
  const { recipientId, recipientName, recipientAvatar, isIncoming } =
    route.params;

  const { startCall, endCall, activeCall } = useStreamVideo();
  const { sendCallMessage } = useStreamChat();

  const [call, setCall] = useState<Call | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [callStatus, setCallStatus] = useState<string>(
    isIncoming ? "Connecting..." : "Calling...",
  );
  const [callDuration, setCallDuration] = useState<number>(0);

  const callStartTimeRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  // Start the duration timer once connected
  const startDurationTimer = useCallback(() => {
    callStartTimeRef.current = Date.now();
    durationIntervalRef.current = setInterval(() => {
      if (callStartTimeRef.current) {
        const elapsed = Math.floor(
          (Date.now() - callStartTimeRef.current) / 1000,
        );
        setCallDuration(elapsed);
      }
    }, 1000);
  }, []);

  // Clean up the timer
  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // Initialize the call when the screen mounts
  useEffect(() => {
    let isMounted = true;

    const initializeCall = async () => {
      try {
        setIsConnecting(true);

        let newCall: Call | null = null;

        if (isIncoming && activeCall) {
          // Incoming call — use the existing active/ringing call
          newCall = activeCall;
        } else {
          // Outgoing call — start a new call
          setCallStatus("Calling...");
          newCall = await startCall(recipientId, false); // false = audio call
        }

        if (!isMounted) return;

        if (newCall) {
          setCall(newCall);
          setCallStatus("Connected");
          setIsConnecting(false);
          startDurationTimer();

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
                `${recipientName} declined the call`,
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
  }, [
    recipientId,
    recipientName,
    startCall,
    navigation,
    startDurationTimer,
    isIncoming,
    activeCall,
  ]);

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

  const toggleSpeaker = useCallback(() => {
    setIsSpeakerOn((current) => !current);
  }, []);

  const handleEndCall = useCallback(async () => {
    try {
      // Stop duration timer
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }

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
    call,
    isMuted,
    isSpeakerOn,
    isConnecting,
    callStatus,
    callDuration,
    callDurationFormatted: formatDuration(callDuration),
    toggleMute,
    toggleSpeaker,
    handleEndCall,
  };
};
