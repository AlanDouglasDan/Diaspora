import { useCallback } from "react";

import type { UpgradeSuccessScreenProps } from "./UpgradeSuccess.types";

export const useUpgradeSuccessLogic = (props: UpgradeSuccessScreenProps) => {
  const { navigation } = props;

  const handleClose = useCallback(() => {
    navigation.navigate("MainTabs");
  }, [navigation]);

  const handleContinue = useCallback(() => {
    navigation.navigate("MainTabs");
  }, [navigation]);

  const handleSeeAllBenefits = useCallback(() => {
    // TODO: Navigate to benefits screen or show modal
  }, []);

  return {
    handleClose,
    handleContinue,
    handleSeeAllBenefits,
  };
};
