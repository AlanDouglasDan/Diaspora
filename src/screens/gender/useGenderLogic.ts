import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import type { GenderScreenProps, GenderOption } from "./Gender.types";
import { useUpdateUser } from "@/src/api/user";

export function useGenderLogic({ navigation }: GenderScreenProps) {
  const { user } = useUser();
  const { updateUser } = useUpdateUser();

  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null
  );
  const [showOnProfile, setShowOnProfile] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectGender = (gender: GenderOption) => {
    setSelectedGender(gender);
  };

  const handleSubmit = async () => {
    if (!user || !selectedGender) return;

    setIsLoading(true);
    try {
      await updateUser(user.id, {
        showGender: showOnProfile,
        // userId: user.id,
        gender: selectedGender,
      });

      // Toast.show({
      //   type: "success",
      //   text1: "Gender Saved!",
      //   text2: "Your gender has been updated",
      // });

      navigation.navigate("DatingPreference");
    } catch (error: any) {
      console.error("Update gender error:", error);
      const errorMessage =
        error?.message || "Could not update gender. Please try again.";
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
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
    isLoading,
  };
}
