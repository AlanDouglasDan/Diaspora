import { useState } from "react";
import { useStreamChat } from "@/src/providers";
import { useStreamVideo } from "@/src/providers/StreamVideoProvider";

import type { SetupCompleteScreenProps } from "./SetupComplete.types";

export function useSetupCompleteLogic({
  navigation,
}: SetupCompleteScreenProps) {
  const { isConnecting: isChatConnecting } = useStreamChat();
  const { isConnecting: isVideoConnecting } = useStreamVideo();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleContinue = async () => {
    setIsNavigating(true);

    // Navigate to Loading screen which will handle the rest
    // The Stream providers will automatically connect when user exists
    navigation.navigate("Loading");
  };

  const isLoading = isNavigating || isChatConnecting || isVideoConnecting;

  return {
    handleContinue,
    isLoading,
  };
}
