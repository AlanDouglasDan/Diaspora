import { useCallback, useState } from "react";

import type { MatchResultScreenProps } from "./MatchResult.types";

export const useMatchResultLogic = (props: MatchResultScreenProps) => {
  const { navigation } = props;

  const [message, setMessage] = useState<string>("");

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      // TODO: Send message
      navigation.goBack();
    }
  }, [message, navigation]);

  const handleSuggestionPress = useCallback((suggestion: string) => {
    setMessage(suggestion);
  }, []);

  return {
    message,
    setMessage,
    handleClose,
    handleSend,
    handleSuggestionPress,
  };
};
