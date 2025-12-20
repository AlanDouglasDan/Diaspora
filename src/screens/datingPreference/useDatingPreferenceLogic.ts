import { useState, useEffect } from "react";
import type {
  DatingPreferenceScreenProps,
  PreferenceOption,
} from "./DatingPreference.types";

export function useDatingPreferenceLogic({
  navigation,
}: DatingPreferenceScreenProps) {
  const [openToEveryone, setOpenToEveryone] = useState(true);
  const [selectedPreferences, setSelectedPreferences] = useState<
    PreferenceOption[]
  >(["WOMEN", "MEN", "NONBINARY"]);

  useEffect(() => {
    if (openToEveryone) {
      setSelectedPreferences(["WOMEN", "MEN", "NONBINARY"]);
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

  const handleSubmit = () => {
    navigation.navigate("Interests");
  };

  const isValid = selectedPreferences.length > 0;

  return {
    openToEveryone,
    setOpenToEveryone,
    handleGoBack,
    handleTogglePreference,
    isPreferenceSelected,
    handleSubmit,
    isValid,
  };
}
