import { useState, useCallback } from "react";

import type { AudioCallScreenProps } from "./AudioCall.types";

export const useAudioCallLogic = (props: AudioCallScreenProps) => {
  const { navigation, route } = props;
  const { recipientName, recipientAvatar } = route.params;

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(true);

  const toggleCameraFacing = useCallback(() => {
    // No-op for audio call, but kept for UI consistency
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

  return {
    recipientName,
    recipientAvatar,
    isMuted,
    isVideoOff,
    toggleCameraFacing,
    toggleMute,
    toggleVideo,
    handleEndCall,
  };
};
