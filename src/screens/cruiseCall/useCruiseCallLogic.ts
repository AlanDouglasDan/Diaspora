import { useState, useCallback, useEffect } from "react";
import { CameraType } from "expo-camera";

import type { CruiseCallScreenProps } from "./CruiseCall.types";

export const useCruiseCallLogic = (props: CruiseCallScreenProps) => {
  const { navigation } = props;

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
    navigation.navigate("CruiseResult");
  }, [navigation]);

  const handleReport = useCallback(() => {
    // TODO: Implement report functionality
  }, []);

  return {
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
