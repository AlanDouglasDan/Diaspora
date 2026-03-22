import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import type { InterestsScreenProps } from "./Interests.types";
import { useGetPreference, useUpdatePreference } from "@/src/api/preferences";
import { useGetInterests } from "@/src/api/interests";
import { ICON_TO_EMOJI } from "@/src/core/constants";

export function useInterestsLogic({ navigation }: InterestsScreenProps) {
  const { user } = useUser();
  const { data: preferenceData, getPreference } = useGetPreference();
  const { updatePreference } = useUpdatePreference();
  const {
    data: interestsData,
    getInterests,
    isLoading: interestsLoading,
  } = useGetInterests();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user?.id) {
      getPreference(user.id);
    }
  }, [user?.id, getPreference]);

  useEffect(() => {
    getInterests();
  }, []);

  // Transform API data to match Interest interface with emojis - use useMemo to prevent infinite loops
  const transformedInterests = useMemo(
    () =>
      interestsData?.map((interest) => ({
        id: interest.title,
        label: interest.title,
        emoji: ICON_TO_EMOJI[interest.icon] || "📌", // Default emoji if icon not found
      })) || [],
    [interestsData],
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      }
      return [...prev, interestId];
    });
  };

  const isInterestSelected = (interestId: string) => {
    return selectedInterests.includes(interestId);
  };

  const handleSkip = () => {
    navigation.navigate("AddPhotos");
  };

  const handleSubmit = async () => {
    if (!user || !preferenceData?.id) return;

    setIsLoading(true);
    try {
      await updatePreference(user.id, {
        interests: selectedInterests,
      });

      navigation.navigate("AddPhotos");
    } catch (error: any) {
      console.log("Update interests error:", error);
      const errorMessage =
        error?.message || "Could not update interests. Please try again.";
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter interests by search query
  const filteredInterests = useMemo(() => {
    if (!searchQuery.trim()) return transformedInterests;
    const query = searchQuery.toLowerCase().trim();
    return transformedInterests.filter((interest) =>
      interest.label.toLowerCase().includes(query),
    );
  }, [transformedInterests, searchQuery]);

  const isValid = selectedInterests.length > 0;

  return {
    selectedInterests,
    handleGoBack,
    handleToggleInterest,
    isInterestSelected,
    handleSkip,
    handleSubmit,
    isValid,
    isLoading,
    interestsLoading,
    transformedInterests: filteredInterests,
    searchQuery,
    setSearchQuery,
  };
}
