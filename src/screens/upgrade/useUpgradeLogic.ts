import { useState, useCallback, useMemo } from "react";

import type { UpgradeScreenProps, PlanData } from "./Upgrade.types";

const PLANS_DATA: Record<string, PlanData> = {
  premium: {
    id: "premium",
    title: "Premium",
    features: [
      { icon: "heart-circle", text: "See who has already liked you" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "mail-heart", text: "Send the special one a Love Letter" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "mail-heart", text: "Send the special one a Love Letter" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "ban", text: "No ads on your timeline" },
    ],
    buttonText: "Upgrade To Premium from $29",
    price: "$29",
  },
  firstClass: {
    id: "firstClass",
    title: "First Class",
    features: [
      { icon: "heart-circle", text: "See who has already liked you" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "mail-heart", text: "Send the special one a Love Letter" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "mail-heart", text: "Send the special one a Love Letter" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "ban", text: "No ads on your timeline" },
      {
        icon: "filter",
        text: "Advanced filter setting to find your cabin crew",
      },
      { icon: "ban", text: "No ads on your timeline" },
    ],
    buttonText: "Upgrade To Economy from $43",
    price: "$43",
  },
};

const TABS = [
  { label: "Business", value: "premium" },
  { label: "First Class", value: "firstClass" },
];

export const useUpgradeLogic = (props: UpgradeScreenProps) => {
  const { navigation } = props;

  const [selectedTab, setSelectedTab] = useState<string>("premium");

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTabChange = useCallback((value: string) => {
    setSelectedTab(value);
  }, []);

  const handleUpgrade = useCallback(() => {
    navigation.navigate("UpgradeSuccess");
  }, [navigation]);

  const currentPlan = useMemo(() => {
    return PLANS_DATA[selectedTab];
  }, [selectedTab]);

  return {
    tabs: TABS,
    selectedTab,
    currentPlan,
    handleClose,
    handleTabChange,
    handleUpgrade,
  };
};
