import { useState, useCallback, useEffect } from "react";
import { CameraType } from "expo-camera";

import type { VideoCallScreenProps } from "./VideoCall.types";

export const useVideoCallLogic = (props: VideoCallScreenProps) => {
  const { navigation, route } = props;
  const { recipientName, recipientAvatar } = route.params;

  const [facing, setFacing] = useState<CameraType>("front");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsConnecting(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoOff((current) => !current);
  }, []);

  const handleEndCall = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleReport = useCallback(() => {
    // TODO: Implement report functionality
  }, []);

  return {
    recipientName,
    recipientAvatar,
    facing,
    isMuted,
    isVideoOff,
    isConnecting,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
    handleReport,
  };
};
