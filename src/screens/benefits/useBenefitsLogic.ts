import { useCallback } from "react";

import type { BenefitsScreenProps } from "./Benefits.types";

const ALL_BENEFITS = [
  { icon: "heart-circle", text: "See who has already liked you" },
  { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
  { icon: "mail-heart", text: "Send the special one a Love Letter" },
  { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
  { icon: "mail-heart", text: "Send the special one a Love Letter" },
  { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
  { icon: "ban", text: "No ads on your timeline" },
  { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
  { icon: "ban", text: "No ads on your timeline" },
  { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
];

export const useBenefitsLogic = (props: BenefitsScreenProps) => {
  const { navigation } = props;

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleContinue = useCallback(() => {
    navigation.navigate("MainTabs");
  }, [navigation]);

  return {
    benefits: ALL_BENEFITS,
    handleClose,
    handleContinue,
  };
};
