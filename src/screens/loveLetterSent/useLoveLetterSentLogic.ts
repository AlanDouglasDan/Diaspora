import { useCallback } from "react";
import type { LoveLetterSentScreenProps } from "./LoveLetterSent.types";

export const useLoveLetterSentLogic = (props: LoveLetterSentScreenProps) => {
  const { navigation, route } = props;
  const { recipientName, recipientImage } = route.params;

  const handleContinueSwiping = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    recipientName,
    recipientImage,
    handleContinueSwiping,
    handleClose,
  };
};
