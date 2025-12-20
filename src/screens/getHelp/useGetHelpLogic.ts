import { useState, useCallback } from "react";

import type { GetHelpScreenProps } from "./GetHelp.types";

export const useGetHelpLogic = ({ navigation }: GetHelpScreenProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleSend = useCallback(() => {
    // TODO: Implement send help request
    console.log("Sending help request:", { email, message, screenshot });
    navigation.goBack();
  }, [email, message, screenshot, navigation]);

  const handleUploadScreenshot = useCallback(() => {
    // TODO: Implement image picker
    console.log("Upload screenshot");
  }, []);

  return {
    email,
    setEmail,
    message,
    setMessage,
    screenshot,
    handleSend,
    handleUploadScreenshot,
  };
};
