import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import type {
  DatingPreferenceScreenProps,
  PreferenceOption,
} from "./DatingPreference.types";
import { useCreatePreference } from "@/src/api/preferences";

export function useDatingPreferenceLogic({
  navigation,
}: DatingPreferenceScreenProps) {
  const { user } = useUser();
  const { createPreference, isLoading } = useCreatePreference();

  const [openToEveryone, setOpenToEveryone] = useState(true);
  const [selectedPreferences, setSelectedPreferences] = useState<
    PreferenceOption[]
  >(["woman", "man", "nonbinary"]);

  useEffect(() => {
    if (openToEveryone) {
      setSelectedPreferences([]);
    }
  }, [openToEveryone]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTogglePreference = (preference: PreferenceOption) => {
    if (openToEveryone) {
      setOpenToEveryone(false);
      setSelectedPreferences([preference]);
    } else {
      setSelectedPreferences((prev) => {
        if (prev.includes(preference)) {
          const newPrefs = prev.filter((p) => p !== preference);
          return newPrefs.length > 0 ? newPrefs : prev;
        }
        return [...prev, preference];
      });
    }
  };

  const isPreferenceSelected = (preference: PreferenceOption) => {
    return selectedPreferences.includes(preference);
  };

  const handleSubmit = async () => {
    if (!user || (selectedPreferences.length === 0 && !openToEveryone)) {
      return;
    }

    try {
      await createPreference({
        lookingToDate: selectedPreferences,
        userId: user.id,
      });

      // Toast.show({
      //   type: "success",
      //   text1: "Preferences Saved!",
      //   text2: "Your dating preferences have been updated",
      // });

      navigation.navigate("Interests");
    } catch (error: any) {
      console.error("Update dating preference error:", error);
      const errorMessage =
        error?.message || "Could not update preferences. Please try again.";
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
      });
    }
  };

  const isValid = selectedPreferences.length > 0 || openToEveryone;

  return {
    openToEveryone,
    setOpenToEveryone,
    handleGoBack,
    handleTogglePreference,
    isPreferenceSelected,
    handleSubmit,
    isValid,
    isLoading,
  };
}
