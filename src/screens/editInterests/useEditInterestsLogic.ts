import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import type { EditInterestsScreenProps, Interest } from "./EditInterests.types";
import { useGetInterests } from "@/src/api/interests";
import { useGetPreference, useUpdatePreference } from "@/src/api/preferences";
import { useAppSelector } from "@/src/store";
import { ICON_TO_EMOJI, INITIAL_VISIBLE_COUNT } from "@/src/core/constants";

export const useEditInterestsLogic = ({
  navigation,
}: EditInterestsScreenProps) => {
  const { user } = useUser();
  const preferencesData = useAppSelector((state) => state.preferences.data);
  const { getPreference } = useGetPreference();
  const { updatePreference } = useUpdatePreference();
  const {
    data: interestsData,
    getInterests,
    isLoading: interestsLoading,
  } = useGetInterests();

  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    getInterests();
  }, [getInterests]);

  // Use useMemo to prevent recreating the array on every render
  const transformedInterests: Interest[] = useMemo(
    () =>
      interestsData?.map((interest) => ({
        id: interest.title,
        label: interest.title,
        emoji: ICON_TO_EMOJI[interest.icon] || "⭐",
      })) || [],
    [interestsData]
  );

  // Prefill selected interests from Redux preferences - only once when data is available
  useEffect(() => {
    if (
      !hasInitialized.current &&
      preferencesData?.interests &&
      Array.isArray(preferencesData.interests) &&
      transformedInterests.length > 0
    ) {
      const selected = transformedInterests.filter((interest) =>
        preferencesData.interests!.includes(interest.id)
      );
      setSelectedInterests(selected);
      hasInitialized.current = true;
    }
  }, [preferencesData?.interests, transformedInterests]);

  const toggleInterest = useCallback((interest: Interest) => {
    setSelectedInterests((prev) => {
      const exists = prev.some((i) => i.id === interest.id);
      if (exists) {
        return prev.filter((i) => i.id !== interest.id);
      }
      return [...prev, interest];
    });
  }, []);

  const isSelected = useCallback(
    (interestId: string) => {
      return selectedInterests.some((i) => i.id === interestId);
    },
    [selectedInterests]
  );

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  // Filter out already selected interests from the available list
  const availableInterests = useMemo(() => {
    const selectedIds = selectedInterests.map((i) => i.id);
    return transformedInterests.filter(
      (interest) => !selectedIds.includes(interest.id)
    );
  }, [transformedInterests, selectedInterests]);

  const visibleInterests = showAll
    ? availableInterests
    : availableInterests.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMoreInterests = availableInterests.length > INITIAL_VISIBLE_COUNT;

  const handleSave = useCallback(async () => {
    if (!user?.id || !preferencesData?.id) return;

    setIsLoading(true);
    try {
      const interestIds = selectedInterests.map((interest) => interest.id);
      await updatePreference(String(preferencesData.id), user.id, {
        interests: interestIds,
      });

      // Refresh preferences data in Redux
      await getPreference(user.id);

      Toast.show({
        type: "success",
        text1: "Interests Updated",
        text2: "Your interests have been saved successfully",
      });

      navigation.goBack();
    } catch (error: any) {
      console.log("Error updating interests:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2:
          error?.message || "Could not update interests. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    user?.id,
    preferencesData?.id,
    selectedInterests,
    updatePreference,
    getPreference,
    navigation,
  ]);

  return {
    interests: visibleInterests,
    selectedInterests,
    toggleInterest,
    isSelected,
    toggleShowAll,
    showAll,
    hasMoreInterests,
    interestsLoading,
    isLoading,
    handleSave,
  };
};
