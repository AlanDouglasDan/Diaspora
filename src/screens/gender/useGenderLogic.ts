import { useState } from "react";
import type { GenderScreenProps, GenderOption } from "./Gender.types";

export function useGenderLogic({ navigation }: GenderScreenProps) {
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null
  );
  const [showOnProfile, setShowOnProfile] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectGender = (gender: GenderOption) => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    navigation.navigate("DatingPreference");
  };

  const isValid = selectedGender !== null;

  return {
    selectedGender,
    showOnProfile,
    setShowOnProfile,
    handleGoBack,
    handleSelectGender,
    handleSubmit,
    isValid,
  };
}
