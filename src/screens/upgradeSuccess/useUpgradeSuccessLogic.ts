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
    navigation.navigate("Benefits");
  }, [navigation]);

  return {
    handleClose,
    handleContinue,
    handleSeeAllBenefits,
  };
};
