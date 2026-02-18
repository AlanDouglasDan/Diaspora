import { useState, useCallback, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "@clerk/clerk-expo";

import {
  useGetProfile,
  useGetPlans,
  useBoostProfile,
  useGetPreference,
} from "@/src/api";
import Toast from "react-native-toast-message";
import { SheetManager } from "react-native-actions-sheet";
import { images } from "core/images";
import { palette } from "core/styles";
import type { RootStackParamList } from "navigation/RootNavigator";

export const useProfileLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 80;
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("plans");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isBoosting, setIsBoosting] = useState(false);

  const {
    data: profileData,
    isLoading: profileLoading,
    getProfile,
  } = useGetProfile();

  const { data: plansData, isLoading: plansLoading, getPlans } = useGetPlans();
  const { boostProfile } = useBoostProfile();
  const { data: preferencesData, getPreference } = useGetPreference();

  useEffect(() => {
    if (user?.id) {
      getProfile(user.id);
      getPreference(user.id);
    }
  }, [user?.id, getProfile, getPreference]);

  useEffect(() => {
    getPlans();
  }, [getPlans]);

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
    [],
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedPlan(null);
  }, []);

  const planItems = [
    { id: "love-letter", label: "Love Letter", count: 4 },
    { id: "super-like", label: "Super Like", count: 4 },
    { id: "take-off", label: "Take Off", count: 4 },
  ];

  // Transform API plans data with static UI data
  const subscriptionPlans =
    plansData?.map((plan) => {
      const productName = plan.product;
      const isFirstClass = productName.includes("First Class");
      const isPremium = productName.includes("Premium");
      const isEconomy = productName.includes("Economy");

      return {
        id: plan.id,
        logoImage: isFirstClass
          ? images.firstClassLogo
          : isPremium
            ? images.premiumLogo
            : images.economyLogo,
        backgroundColor: isFirstClass
          ? palette.PINK
          : isPremium
            ? palette.RED
            : palette.TEXT_COLOR,
        useGradient: isPremium,
        description: isFirstClass
          ? "Unlock all the features to be in complete control of your experience"
          : isPremium
            ? "Get premium features to enhance your dating experience"
            : "Get started with essential features for your dating journey",
        features: isFirstClass
          ? [
              { name: "Unlimited likes", free: false, included: true },
              { name: "Undo left swipes", free: false, included: true },
              { name: "Remove ads", free: false, included: true },
            ]
          : isPremium
            ? [
                { name: "Unlimited likes", free: false, included: true },
                { name: "See who likes you", free: false, included: true },
                { name: "Priority matches", free: false, included: true },
              ]
            : [
                { name: "Unlimited likes", free: false, included: true },
                { name: "Basic matches", free: false, included: true },
                { name: "Limited swipes", free: true, included: true },
              ],
        price: plan.amount,
        buttonText: `Upgrade To ${productName.replace("Diaspora ", "")} from $${
          plan.amount
        }`,
      };
    }) || [];

  const handleOpenSettings = useCallback(() => {
    navigation.navigate("Settings");
  }, [navigation]);

  const handleOpenProfileInfo = useCallback(() => {
    navigation.navigate("ProfileInfo");
  }, [navigation]);

  const handleTakeOff = useCallback(async () => {
    if (!user?.id || isBoosting) return;

    setIsBoosting(true);
    try {
      await boostProfile(user.id);
      // Show boost success sheet
      SheetManager.show("boost-sheet", {
        payload: {
          onKeepSwiping: () => {},
        },
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to boost profile",
        text2: "Please try again",
      });
    } finally {
      setIsBoosting(false);
    }
  }, [user?.id, isBoosting, boostProfile]);

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
    planItems,
    subscriptionPlans,
    handleOpenSettings,
    handleOpenProfileInfo,
    profileData,
    profileLoading,
    plansLoading,
    handleTakeOff,
    isBoosting,
    preferencesData,
  };
};
