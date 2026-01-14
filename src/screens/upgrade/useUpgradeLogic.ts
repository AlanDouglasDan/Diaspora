import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useStripe, PaymentSheetError } from "@stripe/stripe-react-native";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";

import { useGetPlans } from "@/src/api/plans";
import {
  useCreateCustomer,
  useCreateSubscription,
} from "@/src/api/subscription";
import type {
  UpgradeScreenProps,
  PlanData,
  PlanFeature,
} from "./Upgrade.types";

const getDisplayPlanName = (productOrNickname?: string | null) => {
  const raw = (productOrNickname || "").trim();
  if (!raw) return "";
  // e.g. "Diaspora Premium" -> "Premium"
  return raw.replace(/^Diaspora\s+/i, "").trim();
};

// Static features data for display
const PLAN_FEATURES: Record<string, PlanFeature[]> = {
  premium: [
    { icon: "heart-circle", text: "See who has already liked you" },
    { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
    { icon: "mail-heart", text: "Send the special one a Love Letter" },
    { icon: "ban", text: "No ads on your timeline" },
  ],
  firstClass: [
    { icon: "heart-circle", text: "See who has already liked you" },
    { icon: "filter", text: "Advanced filter setting to find your cabin crew" },
    { icon: "mail-heart", text: "Send the special one a Love Letter" },
    { icon: "ban", text: "No ads on your timeline" },
    { icon: "filter", text: "Priority visibility in matches" },
    { icon: "heart-circle", text: "Unlimited likes per day" },
  ],
};

export const useUpgradeLogic = (props: UpgradeScreenProps) => {
  const { navigation } = props;
  const { user } = useUser();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // API hooks
  const { data: plansData, getPlans, isLoading: plansLoading } = useGetPlans();
  const { createCustomer, isLoading: customerLoading } = useCreateCustomer();
  const { createSubscription, isLoading: subscriptionLoading } =
    useCreateSubscription();

  // Local state
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPaymentSheetReady, setIsPaymentSheetReady] = useState(false);

  // Ref to track if payment sheet should be presented
  const shouldPresentSheet = useRef(false);

  // Fetch plans on mount
  useEffect(() => {
    getPlans();
  }, [getPlans]);

  // Set initial selected plan when plans are loaded
  useEffect(() => {
    if (plansData && plansData.length > 0 && !selectedPlanId) {
      setSelectedPlanId(plansData[0].id);
    }
  }, [plansData, selectedPlanId]);

  const tabs = useMemo(() => {
    if (!plansData) return [];
    return plansData.map((plan) => ({
      label:
        getDisplayPlanName(plan.product) || getDisplayPlanName(plan.nickname),
      value: plan.id,
    }));
  }, [plansData]);

  // Initialize Payment Sheet when clientSecret changes
  useEffect(() => {
    if (!clientSecret) return;

    const initializePaymentSheet = async () => {
      try {
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: "Diaspora",
          style: "alwaysDark",
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            email: user?.emailAddresses[0]?.emailAddress,
          },
          returnURL: "diaspora://payment-return",
        });

        if (error) {
          console.error("Payment sheet init error:", error);
          Toast.show({
            type: "error",
            text1: "Payment Setup Failed",
            text2: error.message,
          });
          setIsProcessing(false);
        } else {
          setIsPaymentSheetReady(true);
        }
      } catch (error: any) {
        console.error("Initialization error:", error);
        Toast.show({
          type: "error",
          text1: "Payment Error",
          text2: "Failed to initialize payment",
        });
        setIsProcessing(false);
      }
    };

    initializePaymentSheet();
  }, [clientSecret, initPaymentSheet, user?.emailAddresses]);

  // Present payment sheet when ready
  useEffect(() => {
    if (isPaymentSheetReady && shouldPresentSheet.current) {
      presentPaymentSheetFlow();
    }
  }, [isPaymentSheetReady]);

  const presentPaymentSheetFlow = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === PaymentSheetError.Failed) {
          Toast.show({
            type: "error",
            text1: "Payment Failed",
            text2: "Payment processing failed",
          });
        } else if (error.code === PaymentSheetError.Canceled) {
          Toast.show({
            type: "info",
            text1: "Payment Canceled",
            text2: "You canceled the payment",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Payment Error",
            text2: error.message,
          });
        }
      } else {
        const planName =
          getDisplayPlanName(
            plansData?.find((p) => p.id === selectedPlanId)?.product
          ) || "Premium";

        Toast.show({
          type: "success",
          text1: "Payment Successful!",
          text2: `Welcome to Diaspora ${planName}`,
        });
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        navigation.navigate("UpgradeSuccess");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      Toast.show({
        type: "error",
        text1: "Payment Error",
        text2: "An unexpected error occurred",
      });
    } finally {
      // Reset state
      setIsProcessing(false);
      setClientSecret(null);
      setIsPaymentSheetReady(false);
      shouldPresentSheet.current = false;
    }
  };

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTabChange = useCallback((value: string) => {
    setSelectedPlanId(value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handleUpgrade = useCallback(async () => {
    if (!user?.id || !selectedPlanId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select a plan first",
      });
      return;
    }

    setIsProcessing(true);
    shouldPresentSheet.current = true;

    try {
      // Step 1: Create or get customer
      Toast.show({
        type: "info",
        text1: "Preparing Payment",
        text2: "Setting up your payment...",
      });

      await createCustomer({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
      });

      // Step 2: Create subscription/payment intent
      const subscriptionResponse = await createSubscription({
        userId: user.id,
        priceId: selectedPlanId,
      });

      if (!subscriptionResponse?.clientSecret) {
        // Free plan or no payment required
        Toast.show({
          type: "success",
          text1: "Plan Activated",
          text2: "Your plan has been activated!",
        });
        setIsProcessing(false);
        navigation.navigate("UpgradeSuccess");
        return;
      }

      // Step 3: Set client secret to trigger payment sheet initialization
      setClientSecret(subscriptionResponse.clientSecret);
    } catch (error: any) {
      console.error("Upgrade error:", error);
      Toast.show({
        type: "error",
        text1: "Upgrade Failed",
        text2: error?.message || "Could not process upgrade. Please try again.",
      });
      setIsProcessing(false);
      shouldPresentSheet.current = false;
    }
  }, [user, selectedPlanId, createCustomer, createSubscription, navigation]);

  // Build current plan data from API or fallback to static
  const currentPlan: PlanData = useMemo(() => {
    const selectedApiPlan = plansData?.find((p) => p.id === selectedPlanId);

    const displayName =
      getDisplayPlanName(selectedApiPlan?.product) ||
      getDisplayPlanName(selectedApiPlan?.nickname);

    const displayNameLower = displayName.toLowerCase();
    const isFirstClass = displayNameLower.includes("first class");
    const isPremium = displayNameLower.includes("premium");
    const features = isFirstClass
      ? PLAN_FEATURES.firstClass
      : PLAN_FEATURES.premium;

    if (selectedApiPlan) {
      const price = selectedApiPlan.amount.toFixed(2);
      const planTitle =
        displayName ||
        (isFirstClass ? "First Class" : isPremium ? "Premium" : "Economy");
      const intervalSuffix = selectedApiPlan.interval
        ? `/${selectedApiPlan.interval}`
        : "";

      return {
        id: selectedApiPlan.id,
        title: planTitle,
        features,
        buttonText: `Upgrade To ${planTitle} • $${price}${intervalSuffix}`,
        price: `$${price}`,
      };
    }

    // Fallback static data
    return {
      id: selectedPlanId,
      title: "Premium",
      features,
      buttonText: "Upgrade Now",
      price: "$0",
    };
  }, [plansData, selectedPlanId]);

  const isLoading =
    plansLoading || customerLoading || subscriptionLoading || isProcessing;

  return {
    tabs,
    selectedTab: selectedPlanId,
    currentPlan,
    isLoading,
    plansData,
    handleClose,
    handleTabChange,
    handleUpgrade,
  };
};
