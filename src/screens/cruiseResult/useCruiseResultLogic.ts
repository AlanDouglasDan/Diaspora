import { useCallback } from "react";

import type { CruiseResultScreenProps } from "./CruiseResult.types";

export const useCruiseResultLogic = (props: CruiseResultScreenProps) => {
  const { navigation } = props;

  const handleCancel = useCallback(() => {
    navigation.navigate("MainTabs");
  }, [navigation]);

  const handleLike = useCallback(() => {
    // TODO: Handle yay action
  }, []);

  const handleDislike = useCallback(() => {
    // TODO: Handle nay action
  }, []);

  const handleReport = useCallback(() => {
    // TODO: Handle report action
  }, []);

  return {
    handleCancel,
    handleLike,
    handleDislike,
    handleReport,
  };
};
