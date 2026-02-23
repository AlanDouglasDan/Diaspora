import { useEffect, useState, useCallback } from "react";

import { useStreamChat } from "@/src/providers";
import { useGetUserPreference } from "@/src/api/preferences/useGetUserPreference";
import type { Preference } from "@/src/api/preferences/types";

import type { UserProfileViewScreenProps } from "./UserProfileView.types";

export const useUserProfileViewLogic = ({
  navigation,
  route,
}: UserProfileViewScreenProps) => {
  const { userId, avatar, userName } = route.params;

  const { data: prefs, getUserPreference, isLoading } = useGetUserPreference();
  const { sendLoveLetter, isConnected: isStreamConnected } = useStreamChat();

  const [loveLetterText, setLoveLetterText] = useState("");
  const [isSendingLetter, setIsSendingLetter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const displayName = userName || "User";

  const handleSendLoveLetter = useCallback(async () => {
    if (!loveLetterText.trim() || isSendingLetter || !isStreamConnected) return;

    setIsSendingLetter(true);
    try {
      const success = await sendLoveLetter(userId, loveLetterText);
      if (success) {
        setLoveLetterText("");
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Failed to send love letter:", error);
    } finally {
      setIsSendingLetter(false);
    }
  }, [
    loveLetterText,
    isSendingLetter,
    isStreamConnected,
    sendLoveLetter,
    userId,
  ]);

  useEffect(() => {
    if (userId) {
      getUserPreference(userId);
    }
  }, [userId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleOpenImages = useCallback(() => {
    navigation.navigate("Images", {
      images: [{ uri: avatar }],
    });
  }, [navigation, avatar]);

  const handleHideSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  // Helper to build about me tags from preferences
  const buildAboutMeTags = useCallback((p: Preference): string[] => {
    const tags: string[] = [];
    if (p.height) tags.push(p.height);
    if (p.bodyType) tags.push(p.bodyType);
    if (p.zodiac) tags.push(p.zodiac);
    if (p.religion) tags.push(p.religion);
    if (p.education) tags.push(p.education);
    if (p.familyPlans) tags.push(p.familyPlans);
    if (p.pets) tags.push(p.pets);
    if (p.smoking) tags.push("Smokes");
    if (p.drinking) tags.push("Drinks");
    if (p.sexuality) tags.push(p.sexuality);
    if (p.dietaryPreference) tags.push(p.dietaryPreference);
    if (p.workoutFrequency) tags.push(`Works out: ${p.workoutFrequency}`);
    if (p.personality) tags.push(p.personality);
    if (p.loveLanguage) tags.push(p.loveLanguage);
    if (p.sleepingHabits) tags.push(p.sleepingHabits);
    if (p.travelPlans) tags.push(p.travelPlans);
    return tags;
  }, []);

  return {
    userId,
    avatar,
    displayName,
    prefs,
    isLoading,
    loveLetterText,
    setLoveLetterText,
    isSendingLetter,
    showSuccess,
    handleSendLoveLetter,
    handleGoBack,
    handleOpenImages,
    handleHideSuccess,
    buildAboutMeTags,
  };
};
