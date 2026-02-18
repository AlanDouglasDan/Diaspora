import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import type { DisplayNameScreenProps } from "./DisplayName.types";
import { useUpdateUser } from "@/src/api/user";

export function useDisplayNameLogic({ navigation }: DisplayNameScreenProps) {
  const { user } = useUser();
  const { updateUser } = useUpdateUser();

  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!user || !displayName.trim()) return;

    setIsLoading(true);
    try {
      await updateUser(user.id, {
        displayName: displayName.trim(),
      });

      Toast.show({
        type: "success",
        text1: "Display Name Set!",
        text2: `Welcome, ${displayName}!`,
      });

      navigation.navigate("Birthday");
    } catch (error: any) {
      console.error("Update display name error:", error);
      const errorMessage =
        error?.message || "Could not update display name. Please try again.";
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    displayName,
    setDisplayName,
    handleGoBack,
    handleSubmit,
    isLoading,
  };
}
