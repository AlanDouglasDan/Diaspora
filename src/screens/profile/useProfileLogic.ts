import { useState, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { images } from "core/images";
import { palette } from "core/styles";
import type { RootStackParamList } from "navigation/RootNavigator";

export const useProfileLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 80;

  const [activeTab, setActiveTab] = useState("plans");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const tabs = [
    { label: "Plans", value: "plans" },
    { label: "Safety", value: "safety" },
  ];

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleViewAllFeatures = useCallback((planId: string) => {
    setSelectedPlan(planId);
    setModalVisible(true);
  }, []);

  const getModalFeatures = useCallback(
    () => [
      { label: "Status", value: "Subscribed" },
      { label: "Due date", value: "30 September 2025" },
      { label: "Plan", value: "$46/month" },
    ],
    []
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedPlan(null);
  }, []);

  // Mock user data - replace with actual data from your state management
  const userData = {
    name: "Jackson",
    age: 32,
    profileCompletion: 75,
    avatarUrl: null, // Will use placeholder image
  };

  const planItems = [
    { id: "love-letter", label: "Love Letter", count: 4 },
    { id: "super-like", label: "Super Like", count: 4 },
    { id: "take-off", label: "Take Off", count: 4 },
  ];

  const subscriptionPlans = [
    {
      id: "first-class",
      logoImage: images.firstClassLogo,
      backgroundColor: palette.PINK,
      description:
        "Unlock all the features to be in complete control of your experience",
      features: [
        { name: "Unlimited likes", free: false, included: true },
        { name: "Undo left swipes", free: false, included: true },
        { name: "Remove ads", free: false, included: true },
      ],
      price: 43,
      buttonText: "Upgrade To First Class from $43",
    },
    {
      id: "premium",
      logoImage: images.premiumLogo,
      backgroundColor: palette.RED,
      useGradient: true,
      description: "Get premium features to enhance your dating experience",
      features: [
        { name: "Unlimited likes", free: false, included: true },
        { name: "See who likes you", free: false, included: true },
        { name: "Priority matches", free: false, included: true },
      ],
      price: 29,
      buttonText: "Upgrade To Premium from $29",
    },
    {
      id: "economy",
      logoImage: images.economyLogo,
      backgroundColor: palette.TEXT_COLOR,
      description:
        "Get started with essential features for your dating journey",
      features: [
        { name: "Unlimited likes", free: false, included: true },
        { name: "Basic matches", free: false, included: true },
        { name: "Limited swipes", free: true, included: true },
      ],
      price: 19,
      buttonText: "Upgrade To Economy from $19",
    },
  ];

  const handleOpenSettings = useCallback(() => {
    navigation.navigate("Settings");
  }, [navigation]);

  const handleOpenProfileInfo = useCallback(() => {
    navigation.navigate("ProfileInfo");
  }, [navigation]);

  return {
    activeTab,
    tabs,
    handleTabChange,
    cardWidth,
    modalVisible,
    selectedPlan,
    handleViewAllFeatures,
    handleCloseModal,
    getModalFeatures,
    userData,
    planItems,
    subscriptionPlans,
    handleOpenSettings,
    handleOpenProfileInfo,
  };
};
