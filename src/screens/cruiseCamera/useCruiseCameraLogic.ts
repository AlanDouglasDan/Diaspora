import { useState, useCallback, useEffect } from "react";
import { CameraType, useCameraPermissions } from "expo-camera";
import { Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import { useStartRoulette } from "@/src/api/roulette/useStartRoulette";
import type { CruiseCameraScreenProps } from "./CruiseCamera.types";

export const useCruiseCameraLogic = (props: CruiseCameraScreenProps) => {
  const { navigation } = props;
  const { user } = useUser();
  const { startRoulette, isLoading: isStartingRoulette } = useStartRoulette();

  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "front" ? "back" : "front"));
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleStart = useCallback(async () => {
    if (!user?.id) {
      Alert.alert("Error", "Please sign in to start matching");
      return;
    }

    try {
      const result = await startRoulette(user.id);

      if (result?.success) {
        navigation.navigate("CruiseCall");
      } else {
        Alert.alert(
          "Unable to Start",
          result?.message || "Failed to start matching. Please try again."
        );
      }
    } catch (error) {
      console.error("Start roulette error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  }, [navigation, user?.id, startRoulette]);

  return {
    facing,
    permission,
    isStartingRoulette,
    toggleCameraFacing,
    handleGoBack,
    handleStart,
  };
};
