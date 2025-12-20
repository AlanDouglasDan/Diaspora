import { useState, useCallback, useEffect } from "react";
import { CameraType, useCameraPermissions } from "expo-camera";

import type { CruiseCameraScreenProps } from "./CruiseCamera.types";

export const useCruiseCameraLogic = (props: CruiseCameraScreenProps) => {
  const { navigation } = props;

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

  const handleStart = useCallback(() => {
    navigation.navigate("CruiseCall");
  }, [navigation]);

  return {
    facing,
    permission,
    toggleCameraFacing,
    handleGoBack,
    handleStart,
  };
};
